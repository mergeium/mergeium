import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "@mergeium/ui/components/button";
import { Input } from "@mergeium/ui/components/input";
import Template from "../Template";

export default function LoginRecoveryAuthnCodeInput(props: { kcContext: Extract<KcContext, { pageId: "login-recovery-authn-code-input.ftl" }>; i18n: I18n }) {
    const { kcContext, i18n } = props;

    const { url, messagesPerField, recoveryAuthnCodesInputBean } = kcContext;

    const { msg, msgStr } = i18n;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            headerNode={msg("auth-recovery-code-header")}
            displayMessage={!messagesPerField.existsError("recoveryCodeInput")}
        >
            <form id="kc-recovery-code-login-form" action={url.loginAction} method="post" className="space-y-6">
                <div className="space-y-2">
                    <Input
                        variant="secondary"
                        tabIndex={1}
                        id="recoveryCodeInput"
                        name="recoveryCodeInput"
                        size="xl"
                        aria-invalid={messagesPerField.existsError("recoveryCodeInput")}
                        autoComplete="off"
                        type="text"
                        autoFocus
                        placeholder={msgStr("auth-recovery-code-prompt", `${recoveryAuthnCodesInputBean.codeNumber}`)}
                    />
                    {messagesPerField.existsError("recoveryCodeInput") && (
                        <span
                            id="input-error"
                            className="text-sm text-destructive"
                            aria-live="polite"
                            dangerouslySetInnerHTML={{
                                __html: kcSanitize(messagesPerField.get("recoveryCodeInput"))
                            }}
                        />
                    )}
                </div>

                <Button type="submit" size="xl" className="w-full" name="login" id="kc-login">
                    {msgStr("doLogIn")}
                </Button>
            </form>
        </Template>
    );
}
