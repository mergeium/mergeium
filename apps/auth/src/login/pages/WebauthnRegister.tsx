import { useScript } from "./WebauthnRegister.useScript";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "@mergeium/ui/components/button";
import { Checkbox } from "@mergeium/ui/components/checkbox";
import { Label } from "@mergeium/ui/components/label";

export default function WebauthnRegister(props: PageProps<Extract<KcContext, { pageId: "webauthn-register.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { url, isSetRetry, isAppInitiatedAction } = kcContext;

    const { msg, msgStr } = i18n;

    const authButtonId = "authenticateWebAuthnButton";

    useScript({
        authButtonId,
        kcContext,
        i18n
    });

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            headerNode={msg("webauthn-registration-title")}
        >
            <form id="register" action={url.loginAction} method="post" className="space-y-4">
                <div>
                    <input type="hidden" id="clientDataJSON" name="clientDataJSON" />
                    <input type="hidden" id="attestationObject" name="attestationObject" />
                    <input type="hidden" id="publicKeyCredentialId" name="publicKeyCredentialId" />
                    <input type="hidden" id="authenticatorLabel" name="authenticatorLabel" />
                    <input type="hidden" id="transports" name="transports" />
                    <input type="hidden" id="error" name="error" />
                    <LogoutOtherSessions i18n={i18n} />
                </div>
            </form>
            <input
                type="submit"
                id={authButtonId}
                value={msgStr("doRegisterSecurityKey")}
                className="mt-4 inline-flex h-10 w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />

            {!isSetRetry && isAppInitiatedAction && (
                <form action={url.loginAction} id="kc-webauthn-settings-form" method="post" className="mt-2">
                    <Button type="submit" variant="outline" className="w-full" id="cancelWebAuthnAIA" name="cancel-aia" value="true">
                        {msg("doCancel")}
                    </Button>
                </form>
            )}
        </Template>
    );
}

function LogoutOtherSessions(props: { i18n: I18n }) {
    const { i18n } = props;
    const { msg } = i18n;

    return (
        <div id="kc-form-options" className="flex items-center gap-2">
            <Checkbox id="logout-sessions" name="logout-sessions" value="on" defaultChecked />
            <Label htmlFor="logout-sessions" className="cursor-pointer text-sm">
                {msg("logoutOtherSessions")}
            </Label>
        </div>
    );
}
