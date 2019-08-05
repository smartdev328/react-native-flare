package com.flarejewelry;

import android.app.Application;

import org.reactnative.camera.RNCameraPackage;
import com.reactlibrary.RNBluetoothInfoPackage;
import com.ocetnik.timer.BackgroundTimerPackage;
import com.AlexanderZaytsev.RNI18n.RNI18nPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.lugg.ReactNativeConfig.ReactNativeConfigPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.reactnativenavigation.NavigationApplication;
import com.rt2zz.reactnativecontacts.ReactNativeContacts;
import org.devio.rn.splashscreen.SplashScreenReactPackage;

import com.flarejewelry.NotificationsLifecycleFacade;
import com.flarejewelry.CustomPushNotification;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends NavigationApplication implements INotificationsApplication {

    private NotificationsLifecycleFacade notificationsLifecycleFacade;

    @Override
    public boolean isDebug() {
        // Make sure you are using BuildConfig from your own application
        return BuildConfig.DEBUG;
    }

    protected List<ReactPackage> getPackages() {
        // Add additional packages you require here
        // No need to add RnnPackage and MainReactPackage
        return Arrays.<ReactPackage>asList(
            new BackgroundTimerPackage(),
            new ReactNativeConfigPackage(),
            new ReactNativeContacts(),
            new RNI18nPackage(),
            new VectorIconsPackage()
            new RNNotificationsPackage(MainApplication.this)
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

        notificationsLifecycleFacade = new NotificationsLifecycleFacade();
        setActivityCallbacks(notificationsLifecycleFacade);
    }

    @Override
    public IPushNotification getPushNotification(Context context, Bundle bundle, AppLifecycleFacade defaultFacade, AppLaunchHelper defaultAppLaunchHelper) {
        return new CustomPushNotification(
        	context,
        	bundle,
        	notificationsLifecycleFacade, // Instead of defaultFacade!!!
        	defaultAppLaunchHelper,
        	new JsIOHelper()
		);
    }
}
