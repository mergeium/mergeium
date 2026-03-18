import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "@mergeium/ui/components/button";
import { Input } from "@mergeium/ui/components/input";
import Template from "../Template";

export default function LoginOauth2DeviceVerifyUserCode(
    props: { kcContext: Extract<KcContext, { pageId: "login-oauth2-device-verify-user-code.ftl" }>; i18n: I18n }
) {
    const { kcContext, i18n } = props;
    const { url } = kcContext;

    const { msg, msgStr } = i18n;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            headerNode={msg("oauth2DeviceVerificationTitle")}
        >
            <form
                id="kc-user-verify-device-user-code-form"
                className="space-y-4"
                action={url.oauth2DeviceVerificationAction}
                method="post"
            >
                <div className="space-y-2">
                    <Input
                        variant="secondary"
                        id="device-user-code"
                        name="device_user_code"
                        autoComplete="off"
                        type="text"
                        size="xl"
                        autoFocus
                        placeholder={msgStr("verifyOAuth2DeviceUserCode")}
                    />
                </div>

                <div>
                    <Button type="submit" size="xl" className="w-full">
                        {msgStr("doSubmit")}
                    </Button>
                </div>
            </form>
        </Template>
    );
}
