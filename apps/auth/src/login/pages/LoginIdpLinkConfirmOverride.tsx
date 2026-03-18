import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "@mergeium/ui/components/button";
import Template from "../Template";

export default function LoginIdpLinkConfirmOverride(props: { kcContext: Extract<KcContext, { pageId: "login-idp-link-confirm-override.ftl" }>; i18n: I18n }) {
    const { kcContext, i18n } = props;

    const { url, idpDisplayName } = kcContext;

    const { msg } = i18n;

    return (
        <Template kcContext={kcContext} i18n={i18n} headerNode={msg("confirmOverrideIdpTitle")}>
            <form id="kc-register-form" action={url.loginAction} method="post" className="space-y-4">
                <p className="text-sm text-muted-foreground">
                    {msg("pageExpiredMsg1")}{" "}
                    <a id="loginRestartLink" className="font-medium text-primary underline underline-offset-4 hover:text-primary/80" href={url.loginRestartFlowUrl}>
                        {msg("doClickHere")}
                    </a>
                </p>
                <Button
                    type="submit"
                    variant="outline"
                    className="w-full"
                    name="submitAction"
                    id="confirmOverride"
                    value="confirmOverride"
                >
                    {msg("confirmOverrideIdpContinue", idpDisplayName)}
                </Button>
            </form>
        </Template>
    );
}
