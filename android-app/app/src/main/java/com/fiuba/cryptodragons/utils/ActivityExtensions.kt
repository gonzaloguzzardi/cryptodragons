package com.fiuba.cryptodragons.utils

import androidx.appcompat.app.AppCompatActivity
import androidx.navigation.NavController
import androidx.navigation.fragment.NavHostFragment
import com.fiuba.cryptodragons.R

fun AppCompatActivity.getNavController(): NavController {
    val navHostFragment = supportFragmentManager.findFragmentById(R.id.nav_host_fragment) as NavHostFragment
    return navHostFragment.navController
}
