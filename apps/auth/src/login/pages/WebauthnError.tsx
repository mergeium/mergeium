import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "@mergeium/ui/components/button";
import Template from "../Template";

export default function WebauthnError(props: { kcContext: Extract<KcContext, { pageId: "webauthn-error.ftl" }>; i18n: I18n }) {
    const { kcContext, i18n } = props;

    const { url, isAppInitiatedAction } = kcContext;

    const { msg, msgStr } = i18n;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            displayMessage
            headerNode={msg("webauthn-error-title")}
        >
            <div className="space-y-3">
                <form id="kc-error-credential-form" action={url.loginAction} method="post">
                    <input type="hidden" id="executionValue" name="authenticationExecution" />
                    <input type="hidden" id="isSetRetry" name="isSetRetry" />
                </form>
                <Button
                    size="xl"
                    className="w-full"
                    onClick={() => {
                        // @ts-expect-error: Trusted Keycloak's code
                        document.getElementById("isSetRetry").value = "retry";
                        // @ts-expect-error: Trusted Keycloak's code
                        document.getElementById("executionValue").value = "${execution}";
                        // @ts-expect-error: Trusted Keycloak's code
                        document.getElementById("kc-error-credential-form").requestSubmit();
                    }}
                    type="button"
                    name="try-again"
                    id="kc-try-again"
                >
                    {msgStr("doTryAgain")}
                </Button>
                {isAppInitiatedAction && (
                    <form action={url.loginAction} id="kc-webauthn-settings-form" method="post">
                        <Button
                            type="submit"
                            variant="outline"
                            size="xl"
                            className="w-full"
                            id="cancelWebAuthnAIA"
                            name="cancel-aia"
                            value="true"
                        >
                            {msgStr("doCancel")}
                        </Button>
                    </form>
                )}
            </div>
        </Template>
    );
}
