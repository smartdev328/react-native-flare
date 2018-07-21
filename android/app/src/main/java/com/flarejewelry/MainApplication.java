package com.flarejewelry;

import android.app.Application;

// import com.facebook.react.ReactApplication;
import com.lugg.ReactNativeConfig.ReactNativeConfigPackage;
import com.rt2zz.reactnativecontacts.ReactNativeContacts;
import com.surajit.rnrg.RNRadialGradientPackage;
import com.ocetnik.timer.BackgroundTimerPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.AlexanderZaytsev.RNI18n.RNI18nPackage;
import com.mackentoch.beaconsandroid.BeaconsAndroidPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.reactnativenavigation.NavigationApplication;

// Import dependencies related to checking permissions
// import com.facebook.react.modules.core.PermissionAwareActivity;
// import com.facebook.react.modules.core.PermissionListener;
// import android.annotation.TargetApi;
// import android.support.annotation.Nullable;
// import android.os.Build;


import java.util.Arrays;
import java.util.List;

// public class MainApplication extends NavigationApplication implements PermissionAwareActivity {
    public class MainApplication extends NavigationApplication {
    // @Nullable private PermissionListener mPermissionListener;

    @Override
    public boolean isDebug() {
        // Make sure you are using BuildConfig from your own application
        return BuildConfig.DEBUG;
    }

    protected List<ReactPackage> getPackages() {
        // Add additional packages you require here
        // No need to add RnnPackage and MainReactPackage
        return Arrays.<ReactPackage>asList(
            // eg. new VectorIconsPackage()
            new ReactNativeContacts(),
            new RNRadialGradientPackage(),
            new BackgroundTimerPackage(),
            new VectorIconsPackage(),
            new RNI18nPackage(),
            new BeaconsAndroidPackage(),
            new ReactNativeConfigPackage()
            
        );
    }

    @Override
    public List<ReactPackage> createAdditionalReactPackages() {
        return getPackages();
    }

    @Override
    public String getJSMainModuleName() {
        return "index";
    }

    @Override
    public void onCreate() {
        super.onCreate();
        SoLoader.init(this, /* native exopackage */ false);
    }

    // @TargetApi(Build.VERSION_CODES.M)
    // public void requestPermissions(String[] permissions, int requestCode, PermissionListener listener) {
    //     mPermissionListener = listener;
    //     requestPermissions(permissions, requestCode, mPermissionListener);
    // }

    // public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
    //     if (mPermissionListener != null && mPermissionListener.onRequestPermissionsResult(requestCode, permissions, grantResults)) {
    //         mPermissionListener = null;
    //     }
    // }

    // @Override
    // public boolean shouldShowRequestPermissionRationale(String permission) {
    //     return false;
    // }
}
