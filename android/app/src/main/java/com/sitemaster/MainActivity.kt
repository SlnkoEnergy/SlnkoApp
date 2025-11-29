package com.protrac

import android.os.Bundle
import androidx.activity.SystemBarStyle
import androidx.activity.enableEdgeToEdge
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate

class MainActivity : ReactActivity() {

  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)

    // Enable modern edge-to-edge system bar handling
    enableEdgeToEdge(
      statusBarStyle = SystemBarStyle.auto(
        android.graphics.Color.TRANSPARENT,
        android.graphics.Color.TRANSPARENT
      ),
      navigationBarStyle = SystemBarStyle.auto(
        android.graphics.Color.TRANSPARENT,
        android.graphics.Color.TRANSPARENT
      )
    )
  }

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  override fun getMainComponentName(): String = "ProtracSmart"

  /**
   * Returns the instance of the [ReactActivityDelegate]. We use [DefaultReactActivityDelegate]
   * which allows you to enable New Architecture with a single boolean flags [fabricEnabled]
   */
  override fun createReactActivityDelegate(): ReactActivityDelegate =
    DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)
}
