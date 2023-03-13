package com.fiuba.cryptodragons.home

import android.annotation.SuppressLint
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.webkit.WebSettings.LayoutAlgorithm.*
import androidx.fragment.app.Fragment
import com.fiuba.cryptodragons.databinding.FragmentHomeBinding


/**
 * A simple [Fragment] subclass as the second destination in the navigation.
 */
class HomeFragment : Fragment() {

    private var _binding: FragmentHomeBinding? = null

    // This property is only valid between onCreateView and onDestroyView.
    private val binding get() = _binding!!

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentHomeBinding.inflate(inflater, container, false)
        return binding.root

    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        setupWebView()
        loadUrl()
    }

    @SuppressLint("SetJavaScriptEnabled")
    private fun setupWebView() {
        binding.dappWebview.run {
            settings.allowFileAccess = false
            settings.allowContentAccess = false
            settings.javaScriptEnabled = true
            settings.layoutAlgorithm = NORMAL
        }
    }

    private fun loadUrl() {
        binding.dappWebview.loadUrl(DAPP_URI)
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }

    companion object {
        private const val DAPP_URI = "http://10.0.2.2:3000/"
    }
}
