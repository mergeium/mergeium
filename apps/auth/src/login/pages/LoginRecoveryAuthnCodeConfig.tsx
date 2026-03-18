import { useScript } from "./LoginRecoveryAuthnCodeConfig.useScript";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "@mergeium/ui/components/button";
import { Checkbox } from "@mergeium/ui/components/checkbox";
import { Label } from "@mergeium/ui/components/label";
import Template from "../Template";

export default function LoginRecoveryAuthnCodeConfig(props: { kcContext: Extract<KcContext, { pageId: "login-recovery-authn-code-config.ftl" }>; i18n: I18n }) {
    const { kcContext, i18n } = props;

    const { recoveryAuthnCodesConfigBean, isAppInitiatedAction } = kcContext;

    const { msg, msgStr } = i18n;

    const olRecoveryCodesListId = "kc-recovery-codes-list";

    useScript({ olRecoveryCodesListId, i18n });

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            headerNode={msg("recovery-code-config-header")}
        >
            <div className="rounded-md border border-yellow-500/50 bg-yellow-50 p-4 dark:bg-yellow-950/20" aria-label="Warning alert">
                <h4 className="font-semibold text-yellow-800 dark:text-yellow-200">
                    {msg("recovery-code-config-warning-title")}
                </h4>
                <p className="mt-1 text-sm text-yellow-700 dark:text-yellow-300">
                    {msg("recovery-code-config-warning-message")}
                </p>
            </div>

            <ol id={olRecoveryCodesListId} className="mt-4 list-decimal space-y-1 rounded-md border bg-muted/50 p-4 pl-8 font-mono text-sm">
                {recoveryAuthnCodesConfigBean.generatedRecoveryAuthnCodesList.map((code, index) => (
                    <li key={index}>
                        <span>{index + 1}:</span> {code.slice(0, 4)}-{code.slice(4, 8)}-{code.slice(8)}
                    </li>
                ))}
            </ol>

            {/* actions */}
            <div className="mt-4 flex flex-wrap gap-2">
                <Button id="printRecoveryCodes" variant="link" type="button" className="px-2">
                    {msg("recovery-codes-print")}
                </Button>
                <Button id="downloadRecoveryCodes" variant="link" type="button" className="px-2">
                    {msg("recovery-codes-download")}
                </Button>
                <Button id="copyRecoveryCodes" variant="link" type="button" className="px-2">
                    {msg("recovery-codes-copy")}
                </Button>
            </div>

            {/* confirmation checkbox */}
            <div className="mt-4 flex items-center gap-2">
                <Checkbox
                    id="kcRecoveryCodesConfirmationCheck"
                    name="kcRecoveryCodesConfirmationCheck"
                    onCheckedChange={(checked) => {
                        //@ts-expect-error: This is inherited from the original code
                        document.getElementById("saveRecoveryAuthnCodesBtn").disabled = !checked;
                    }}
                />
                <Label htmlFor="kcRecoveryCodesConfirmationCheck" className="cursor-pointer text-sm">
                    {msg("recovery-codes-confirmation-message")}
                </Label>
            </div>

            <form action={kcContext.url.loginAction} id="kc-recovery-codes-settings-form" method="post" className="mt-6 space-y-4">
                <input type="hidden" name="generatedRecoveryAuthnCodes" value={recoveryAuthnCodesConfigBean.generatedRecoveryAuthnCodesAsString} />
                <input type="hidden" name="generatedAt" value={recoveryAuthnCodesConfigBean.generatedAt} />
                <input type="hidden" id="userLabel" name="userLabel" value={msgStr("recovery-codes-label-default")} />

                <LogoutOtherSessions i18n={i18n} />

                {isAppInitiatedAction ? (
                    <div className="flex gap-2">
                        <Button type="submit" size="xl" id="saveRecoveryAuthnCodesBtn" disabled>
                            {msgStr("recovery-codes-action-complete")}
                        </Button>
                        <Button type="submit" variant="outline" size="xl" id="cancelRecoveryAuthnCodesBtn" name="cancel-aia" value="true">
                            {msg("recovery-codes-action-cancel")}
                        </Button>
                    </div>
                ) : (
                    <Button type="submit" size="xl" className="w-full" id="saveRecoveryAuthnCodesBtn" disabled>
                        {msgStr("recovery-codes-action-complete")}
                    </Button>
                )}
            </form>
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
