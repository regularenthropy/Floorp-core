const { Services } = ChromeUtils.import("resource://gre/modules/Services.jsm");

export function autoRestart() {
    if (!Services.prefs.getBoolPref("floorp.enable.auto.restart", false)) {
        (async () => {
            let userConfirm = await confirmRestartPrompt(null);
            if (userConfirm == CONFIRM_RESTART_PROMPT_RESTART_NOW) {
                Services.startup.quit(
                    Ci.nsIAppStartup.eAttemptQuit | Ci.nsIAppStartup.eRestart,
                );
            }
        })();
    } else {
        window.setTimeout(() => {
            Services.startup.quit(
                Services.startup.eAttemptQuit | Services.startup.eRestart,
            );
        }, 500);
    }
}
