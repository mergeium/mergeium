import { useState } from "react";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { useScript } from "./LoginUsername.useScript";
import { Button } from "@mergeium/ui/components/button";
import { Input } from "@mergeium/ui/components/input";
import { Label } from "@mergeium/ui/components/label";
import { Checkbox } from "@mergeium/ui/components/checkbox";
import { SpinnerIcon } from "@phosphor-icons/react";
import Template from "../Template";
import { ProviderIcon } from "../components/provider-icons";

export default function LoginUsername(props: { kcContext: Extract<KcContext, { pageId: "login-username.ftl" }>; i18n: I18n }) {
    const { kcContext, i18n } = props;

    const { social, realm, url, usernameHidden, login, registrationDisabled, messagesPerField, enableWebAuthnConditionalUI, authenticators } =
        kcContext;

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
            displayMessage={!messagesPerField.existsError("username")}
            displayInfo={realm.password && realm.registrationAllowed && !registrationDisabled}
            infoNode={
                <div id="kc-registration">
                    <span>
                        {msg("noAccount")}{" "}
                        <a tabIndex={6} href={url.registrationUrl}>
                            {msg("doRegister")}
                        </a>
                    </span>
                </div>
            }
            headerNode={msg("doLogIn")}
            socialProvidersNode={
                <>
                    {realm.password && social?.providers !== undefined && social.providers.length !== 0 && (
                        <div id="kc-social-providers" className="space-y-3">
                            <div className="grid grid-cols-1 gap-2">
                                {social.providers.map((...[p]) => (
                                    <Button key={p.alias} variant="secondary" size="xl" className="w-full" asChild>
                                        <a id={`social-${p.alias}`} href={p.loginUrl} className="relative flex items-center justify-center w-full">
                                            <ProviderIcon providerId={p.providerId} alias={p.alias} className="size-5 absolute left-4" />
                                            <span>{`Sign in with ${p.displayName}`}</span>
                                        </a>
                                    </Button>
                                ))}
                            </div>
                            <div className="border-b border-border" />
                        </div>
                    )}
                </>
            }
        >
            <div id="kc-form">
                <div id="kc-form-wrapper">
                    {realm.password && (
                        <form
                            id="kc-form-login"
                            onSubmit={() => {
                                setIsLoginButtonDisabled(true);
                                return true;
                            }}
                            action={url.loginAction}
                            method="post"
                            className="space-y-3"
                        >
                            {!usernameHidden && (
                                <div className="space-y-2">
                                    <Input
                                        variant="secondary"
                                        tabIndex={2}
                                        id="username"
                                        name="username"
                                        defaultValue={login.username ?? ""}
                                        type="text"
                                        size="xl"
                                        autoFocus
                                        placeholder={
                                            !realm.loginWithEmailAllowed
                                                ? msgStr("username")
                                                : !realm.registrationEmailAsUsername
                                                  ? msgStr("usernameOrEmail")
                                                  : msgStr("email")
                                        }
                                        autoComplete={enableWebAuthnConditionalUI ? "username webauthn" : "username"}
                                        aria-invalid={messagesPerField.existsError("username")}
                                    />
                                    {messagesPerField.existsError("username") && (
                                        <span id="input-error" className="text-xs text-destructive" aria-live="polite">
                                            {messagesPerField.getFirstError("username")}
                                        </span>
                                    )}
                                </div>
                            )}

                            {realm.rememberMe && !usernameHidden && (
                                <div className="flex items-center gap-2">
                                    <Checkbox
                                        tabIndex={3}
                                        id="rememberMe"
                                        name="rememberMe"
                                        defaultChecked={!!login.rememberMe}
                                    />
                                    <Label htmlFor="rememberMe" className="text-sm font-normal text-muted-foreground">
                                        {msg("rememberMe")}
                                    </Label>
                                </div>
                            )}

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
                                    {isLoginButtonDisabled ? <SpinnerIcon className="size-5 animate-spin" /> : msgStr("doLogIn")}
                                </Button>
                            </div>
                        </form>
                    )}
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
