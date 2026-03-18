/**
 * Password step (login-password.ftl) for flows where username is already captured.
 * Adds conditional WebAuthn passkey authenticate section when enabled.
 */
import { useState } from "react";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { useScript } from "./LoginPassword.useScript";
import { Button } from "@mergeium/ui/components/button";
import { Input } from "@mergeium/ui/components/input";
import { Separator } from "@mergeium/ui/components/separator";
import Template from "../Template";

export default function LoginPassword(props: { kcContext: Extract<KcContext, { pageId: "login-password.ftl" }>; i18n: I18n }) {
    const { kcContext, i18n } = props;

    const { realm, url, messagesPerField, enableWebAuthnConditionalUI, authenticators } = kcContext;

    const { msg, msgStr } = i18n;

    const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);

    const webAuthnButtonId = "authenticateWebAuthnButton";

    useScript({
        webAuthnButtonId,
        kcContext,
        i18n
    });

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            headerNode={msg("doLogIn")}
            displayMessage={!messagesPerField.existsError("password")}
        >
            <div id="kc-form">
                <div id="kc-form-wrapper">
                    <form
                        id="kc-form-login"
                        onSubmit={() => {
                            setIsLoginButtonDisabled(true);
                            return true;
                        }}
                        action={url.loginAction}
                        method="post"
                        className="space-y-4"
                    >
                        <div className="space-y-2">
                            <Separator />
                                <Input
                                    variant="secondary"
                                    tabIndex={2}
                                    id="password"
                                    name="password"
                                    type="password"
                                    size="xl"
                                    autoFocus
                                    placeholder={msgStr("password")}
                                    autoComplete="on"
                                    aria-invalid={messagesPerField.existsError("username", "password")}
                                />
                            {messagesPerField.existsError("password") && (
                                <span
                                    id="input-error-password"
                                    className="text-sm text-destructive"
                                    aria-live="polite"
                                    dangerouslySetInnerHTML={{
                                        __html: kcSanitize(messagesPerField.get("password"))
                                    }}
                                />
                            )}
                        </div>

                        <div className="flex items-center justify-between">
                            <div id="kc-form-options">
                                {realm.resetPasswordAllowed && (
                                    <Button variant="link" size="sm" className="px-0" asChild>
                                        <a tabIndex={5} href={url.loginResetCredentialsUrl}>
                                            {msg("doForgotPassword")}
                                        </a>
                                    </Button>
                                )}
                            </div>
                        </div>

                        <div id="kc-form-buttons">
                            <Button
                                tabIndex={4}
                                disabled={isLoginButtonDisabled}
                                name="login"
                                id="kc-login"
                                type="submit"
                                size="xl"
                                className="w-full"
                            >
                                {msgStr("doLogIn")}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
            {enableWebAuthnConditionalUI && (
                <>
                    <form id="webauth" action={url.loginAction} method="post">
                        <input type="hidden" id="clientDataJSON" name="clientDataJSON" />
                        <input type="hidden" id="authenticatorData" name="authenticatorData" />
                        <input type="hidden" id="signature" name="signature" />
                        <input type="hidden" id="credentialId" name="credentialId" />
                        <input type="hidden" id="userHandle" name="userHandle" />
                        <input type="hidden" id="error" name="error" />
                    </form>

                    {authenticators !== undefined && authenticators.authenticators.length !== 0 && (
                        <form id="authn_select">
                            {authenticators.authenticators.map((authenticator, i) => (
                                <input key={i} type="hidden" name="authn_use_chk" readOnly value={authenticator.credentialId} />
                            ))}
                        </form>
                    )}

                    <div className="mt-4">
                        <Button
                            id={webAuthnButtonId}
                            type="button"
                            variant="outline"
                            size="xl"
                            className="w-full"
                        >
                            {msgStr("passkey-doAuthenticate")}
                        </Button>
                    </div>
                </>
            )}
        </Template>
    );
}

