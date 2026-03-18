import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "@mergeium/ui/components/button";
import { Label } from "@mergeium/ui/components/label";
import Template from "../Template";

export default function LoginX509Info(props: { kcContext: Extract<KcContext, { pageId: "login-x509-info.ftl" }>; i18n: I18n }) {
    const { kcContext, i18n } = props;

    const { url, x509 } = kcContext;

    const { msg, msgStr } = i18n;

    return (
        <Template kcContext={kcContext} i18n={i18n} headerNode={msg("doLogIn")}>
            <form id="kc-x509-login-info" action={url.loginAction} method="post" className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="certificate_subjectDN">{msg("clientCertificate")}</Label>
                    <p id="certificate_subjectDN" className="text-sm text-muted-foreground">
                        {x509.formData.subjectDN ? x509.formData.subjectDN : msg("noCertificate")}
                    </p>
                </div>

                {x509.formData.isUserEnabled && (
                    <div className="space-y-2">
                        <Label htmlFor="username">{msg("doX509Login")}</Label>
                        <p id="username" className="text-sm text-muted-foreground">
                            {x509.formData.username}
                        </p>
                    </div>
                )}

                <div className="flex gap-2">
                    <Button type="submit" size="xl" name="login" id="kc-login">
                        {msgStr("doContinue")}
                    </Button>
                    {x509.formData.isUserEnabled && (
                        <Button type="submit" size="xl" variant="outline" name="cancel" id="kc-cancel">
                            {msgStr("doIgnore")}
                        </Button>
                    )}
                </div>
            </form>
        </Template>
    );
}
