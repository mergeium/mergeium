import { Fragment } from "react";
import { useScript } from "./LoginPasskeysConditionalAuthenticate.useScript";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Input } from "@mergeium/ui/components/input";
import Template from "../Template";

export default function LoginPasskeysConditionalAuthenticate(
    props: { kcContext: Extract<KcContext, { pageId: "login-passkeys-conditional-authenticate.ftl" }>; i18n: I18n }
) {
    const { kcContext, i18n } = props;

    const { messagesPerField, login, url, usernameHidden, shouldDisplayAuthenticators, authenticators, registrationDisabled, realm } = kcContext;

    const { msg, msgStr, advancedMsg } = i18n;

    const authButtonId = "authenticateWebAuthnButton";

    useScript({ authButtonId, kcContext, i18n });

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            headerNode={msg("passkey-login-title")}
            infoNode={
                realm.registrationAllowed &&
                !registrationDisabled && (
                    <div id="kc-registration">
                        <span>
                            ${msg("noAccount")}{" "}
                            <a tabIndex={6} href={url.registrationUrl} className="text-primary underline">
                                {msg("doRegister")}
                            </a>
                        </span>
                    </div>
                )
            }
        >
            <form id="webauth" action={url.loginAction} method="post">
                <input type="hidden" id="clientDataJSON" name="clientDataJSON" />
                <input type="hidden" id="authenticatorData" name="authenticatorData" />
                <input type="hidden" id="signature" name="signature" />
                <input type="hidden" id="credentialId" name="credentialId" />
                <input type="hidden" id="userHandle" name="userHandle" />
                <input type="hidden" id="error" name="error" />
            </form>

            <div style={{ marginBottom: 0 }}>
                {authenticators !== undefined && Object.keys(authenticators).length !== 0 && (
                    <>
                        <form id="authn_select">
                            {authenticators.authenticators.map((authenticator, i) => (
                                <input key={i} type="hidden" name="authn_use_chk" readOnly value={authenticator.credentialId} />
                            ))}
                        </form>
                        {shouldDisplayAuthenticators && (
                            <div className="space-y-3">
                                {authenticators.authenticators.length > 1 && (
                                    <p className="text-sm font-medium">{msg("passkey-available-authenticators")}</p>
                                )}
                                <div className="space-y-2">
                                    {authenticators.authenticators.map((authenticator, i) => (
                                        <div key={i} id={`kc-webauthn-authenticator-item-${i}`} className="flex items-center gap-3 rounded-md border p-3">
                                            <div className="flex-1">
                                                <div id={`kc-webauthn-authenticator-label-${i}`} className="font-medium">
                                                    {advancedMsg(authenticator.label)}
                                                </div>
                                                {authenticator.transports !== undefined &&
                                                    authenticator.transports.displayNameProperties !== undefined &&
                                                    authenticator.transports.displayNameProperties.length !== 0 && (
                                                        <div
                                                            id={`kc-webauthn-authenticator-transport-${i}`}
                                                            className="text-sm text-muted-foreground"
                                                        >
                                                            {authenticator.transports.displayNameProperties.map((nameProperty, i, arr) => (
                                                                <Fragment key={i}>
                                                                    <span> {advancedMsg(nameProperty)} </span>
                                                                    {i !== arr.length - 1 && <span>, </span>}
                                                                </Fragment>
                                                            ))}
                                                        </div>
                                                    )}
                                                <div className="text-sm text-muted-foreground">
                                                    <span id={`kc-webauthn-authenticator-createdlabel-${i}`}>{msg("passkey-createdAt-label")}</span>{" "}
                                                    <span id={`kc-webauthn-authenticator-created-${i}`}>{authenticator.createdAt}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </>
                )}
                <div id="kc-form">
                    <div id="kc-form-wrapper">
                        {realm.password && (
                            <form
                                id="kc-form-login"
                                action={url.loginAction}
                                method="post"
                                style={{ display: "none" }}
                                onSubmit={event => {
                                    try {
                                        // @ts-expect-error
                                        event.target.login.disabled = true;
                                    } catch {}

                                    return true;
                                }}
                            >
                                {!usernameHidden && (
                                    <div className="space-y-2">
                                        <Input
                                            variant="secondary"
                                            tabIndex={1}
                                            id="username"
                                            size="xl"
                                            aria-invalid={messagesPerField.existsError("username")}
                                            name="username"
                                            defaultValue={login.username ?? ""}
                                            autoComplete="username webauthn"
                                            type="text"
                                            autoFocus
                                            placeholder={msgStr("passkey-autofill-select")}
                                        />
                                        {messagesPerField.existsError("username") && (
                                            <span id="input-error-username" className="text-sm text-destructive" aria-live="polite">
                                                {messagesPerField.get("username")}
                                            </span>
                                        )}
                                    </div>
                                )}
                            </form>
                        )}
                        <div id="kc-form-passkey-button" style={{ display: "none" }}>
                            <input
                                id={authButtonId}
                                type="button"
                                autoFocus
                                value={msgStr("passkey-doAuthenticate")}
                                className="inline-flex h-10 w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Template>
    );
}
