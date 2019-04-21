﻿using System;
using Loom.Client.Internal;
using Loom.Google.Protobuf;
using Loom.Nethereum.Util;
using Loom.Newtonsoft.Json;

namespace Loom.Client
{
    [JsonConverter(typeof(AddressJsonConverter))]
    public struct Address : IEquatable<Address>
    {
        public const string DefaultChainId = "default";
        private const int AddressLengthBytes = 20;

        private static readonly AddressUtil addressUtil = new AddressUtil();

        public string ChainId { get; }

        /// <summary>
        /// Checksum-encoded local part of the address as a hex string, in the format "0x...".
        /// </summary>
        public string LocalAddress { get; }

        /// <summary>
        /// String representation of the address, in the format "chain:0x...".
        /// </summary>
        public string QualifiedAddress => $"{this.ChainId}:{this.LocalAddress}";

        /// <summary>
        /// Hex-string representation of the local part of the address, in the format "0x...".
        /// </summary>
        [Obsolete("Use LocalAddress")]
        public string LocalAddressHexString => LocalAddress;

        /// <summary>
        /// Creates an Address instance from a hex string representing an address.
        /// </summary>
        /// <param name="localAddress">Hex encoded string, may start with "0x".</param>
        /// <param name="chainId">Identifier of a DAppChain.</param>
        public Address(string localAddress, string chainId = DefaultChainId) {
            if (String.IsNullOrWhiteSpace(localAddress))
                throw new ArgumentException("Non-empty string expected", nameof(localAddress));

            if (!addressUtil.IsValidAddressLength(localAddress))
                throw new ArgumentException("Address must a be 40-character hex string (not including the 0x prefix)", nameof(localAddress));

            if (String.IsNullOrWhiteSpace(chainId))
                throw new ArgumentException("Non-empty string expected", nameof(chainId));

            LocalAddress = addressUtil.ConvertToChecksumAddress(localAddress);
            ChainId = chainId;
        }

        /// <summary>
        /// Creates an Address instance from a 32-byte public key.
        /// </summary>
        /// <param name="publicKey">32-byte public key.</param>
        /// <param name="chainId">Identifier of a DAppChain.</param>
        private Address(byte[] publicKey, string chainId = DefaultChainId)
            : this(AddressStringFromPublicKey(publicKey), chainId) {
        }

        /// <summary>
        /// Returns binary 20-byte array representing of the address.
        /// </summary>
        /// <returns>20-byte array containing the address.</returns>
        public byte[] ToByteArray()
        {
            return CryptoUtils.HexStringToBytes(LocalAddress.Substring(2));
        }

        /// <summary>
        /// Creates an <see cref="Protobuf.Address"/> instance from an address.
        /// </summary>
        /// <param name="address">An address.</param>
        /// <returns>A <see cref="Protobuf.Address"/> instance</returns>
        public Protobuf.Address ToProtobufAddress() {
            return new Protobuf.Address
            {
                ChainId = ChainId,
                Local = ByteString.CopyFrom(ToByteArray())
            };
        }

        /// <summary>
        /// Creates an Address instance from a string representation.
        /// </summary>
        /// <param name="address">Address string, in "0x..." or "chain:0x..." format.</param>
        /// <returns>An address</returns>
        public static Address FromString(string address) {
            if (String.IsNullOrWhiteSpace(address))
                throw new ArgumentException("Non-empty string expected", nameof(address));

            int colonIndex = address.IndexOf(":", StringComparison.OrdinalIgnoreCase);
            if (colonIndex == -1)
                return new Address(address);

            return new Address(
                address.Substring(colonIndex + 1, address.Length - 1 - colonIndex),
                address.Substring(0, colonIndex)
            );
        }

        /// <summary>
        /// Creates an Address instance from a Protobuf representation of an address.
        /// </summary>
        /// <param name="protobufAddress"><see cref="Protobuf.Address"/> instance.</param>
        /// <returns>An address</returns>
        public static Address FromProtobufAddress(Protobuf.Address protobufAddress)
        {
            if (protobufAddress == null)
                throw new ArgumentNullException(nameof(protobufAddress));

            if (protobufAddress.Local == null)
                throw new ArgumentNullException(nameof(protobufAddress.Local));

            if (protobufAddress.Local.Length != AddressLengthBytes)
                throw new ArgumentException("Local address must have a length of 20 bytes", nameof(protobufAddress.Local));

            return new Address(
                CryptoUtils.BytesToHexString(protobufAddress.Local.ToByteArray()),
                String.IsNullOrWhiteSpace(protobufAddress.ChainId) ? DefaultChainId : protobufAddress.ChainId
            );
        }

        /// <summary>
        /// Creates an Address instance from a hex string representing an address.
        /// </summary>
        /// <param name="localAddress">Hex encoded string, may start with "0x".</param>
        /// <param name="chainId">Identifier of a DAppChain.</param>
        /// <returns>An address</returns>
        public static Address FromString(string localAddress, string chainId) {
            return new Address(localAddress, chainId);
        }

        /// <summary>
        /// Creates an Address instance from a 32-byte public key.
        /// </summary>
        /// <param name="publicKey">32-byte public key.</param>
        /// <param name="chainId">Identifier of a DAppChain.</param>
        /// <returns>An address</returns>
        public static Address FromPublicKey(byte[] publicKey, string chainId = DefaultChainId) {
            return new Address(publicKey, chainId);
        }

        /// <summary>
        /// Creates an Address instance from a hex string representing an address.
        /// </summary>
        /// <param name="localAddress">Hex encoded string, may start with "0x".</param>
        /// <param name="chainId">Identifier of a DAppChain.</param>
        /// <returns>An address</returns>
        [Obsolete("Use FromString or the constructor")]
        public static Address FromHexString(string localAddress, string chainId = DefaultChainId) {
            return new Address(localAddress, chainId);
        }

        /// <summary>
        /// Generates a string representation of the address, in the format "chain:0x...".
        /// </summary>
        /// <returns>A string representing the address.</returns>
        [Obsolete("Use QualifiedAddress")]
        public string ToAddressString() {
            return QualifiedAddress;
        }

        /// <returns>Checksum-encoded local part of the address as a hex string, in the format "0x...".</returns>
        public override string ToString() {
            return this.ChainId == DefaultChainId ? this.LocalAddress : this.QualifiedAddress;
        }

        #region Cast operators

        // string-to-Address is explicit, since ChainId is lost
        public static explicit operator string(Address address) {
            return address.LocalAddress;
        }

        public static explicit operator Address(string address) {
            return FromString(address);
        }

        #endregion

        #region Equality

        public bool Equals(Address other) {
            return
                string.Equals(ChainId, other.ChainId, StringComparison.OrdinalIgnoreCase) &&
                string.Equals(LocalAddress, other.LocalAddress, StringComparison.OrdinalIgnoreCase);
        }

        public override bool Equals(object obj) {
            if (ReferenceEquals(null, obj)) return false;
            return obj is Address && Equals((Address) obj);
        }

        public override int GetHashCode() {
            unchecked
            {
                return
                    ((ChainId != null ? StringComparer.OrdinalIgnoreCase.GetHashCode(ChainId) : 0) * 397) ^
                    (LocalAddress != null ? StringComparer.OrdinalIgnoreCase.GetHashCode(LocalAddress) : 0);
            }
        }

        public static bool operator ==(Address left, Address right) {
            return left.Equals(right);
        }

        public static bool operator !=(Address left, Address right) {
            return !left.Equals(right);
        }

        #endregion

        private static string AddressStringFromPublicKey(byte[] publicKey) {
            if (publicKey == null)
                throw new ArgumentNullException(nameof(publicKey));

            if (publicKey.Length != 32)
                throw new ArgumentException("Expected a 32-byte array", nameof(publicKey));

            return CryptoUtils.BytesToHexString(CryptoUtils.LocalAddressFromPublicKey(publicKey));
        }
    }
}
