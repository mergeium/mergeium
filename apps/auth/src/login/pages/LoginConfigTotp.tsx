import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "@mergeium/ui/components/button";
import { Input } from "@mergeium/ui/components/input";
import { Label } from "@mergeium/ui/components/label";
import { Checkbox } from "@mergeium/ui/components/checkbox";
import Template from "../Template";

export default function LoginConfigTotp(props: { kcContext: Extract<KcContext, { pageId: "login-config-totp.ftl" }>; i18n: I18n }) {
    const { kcContext, i18n } = props;

    const { url, isAppInitiatedAction, totp, mode, messagesPerField } = kcContext;

    const { msg, msgStr } = i18n;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            headerNode={msg("loginTotpTitle")}
            displayMessage={!messagesPerField.existsError("totp", "userLabel")}
        >
            <>
                <div className="space-y-3">
                    <p className="text-center text-sm text-muted-foreground">{msg("loginTotpStep1")}</p>

                    {mode == "manual" ? (
                        <>
                            <p className="text-center text-sm text-muted-foreground">{msg("loginTotpManualStep2")}</p>
                            <Input
                                id="kc-totp-secret-key"
                                variant="secondary"
                                size="xl"
                                className="text-center font-mono tracking-wider"
                                defaultValue={totp.totpSecretEncoded}
                                readOnly
                                copyable
                            />
                            <p className="text-center text-sm text-muted-foreground">
                                <a href={totp.qrUrl} id="mode-barcode" className="text-primary hover:underline">
                                    {msg("loginTotpScanBarcode")}
                                </a>
                            </p>
                        </>
                    ) : (
                        <>
                            <p className="text-center text-sm text-muted-foreground">{msg("loginTotpStep2")}</p>
                            <div className="flex justify-center">
                                <img
                                    id="kc-totp-secret-qr-code"
                                    src={`data:image/png;base64, ${totp.totpSecretQrCode}`}
                                    alt="Figure: Barcode"
                                    className="rounded-lg"
                                />
                            </div>
                            <p className="text-center text-sm text-muted-foreground">
                                <a href={totp.manualUrl} id="mode-manual" className="text-primary hover:underline">
                                    {msg("loginTotpUnableToScan")}
                                </a>
                            </p>
                        </>
                    )}
                </div>

                <form action={url.loginAction} id="kc-totp-settings-form" method="post" className="mt-6 space-y-3">
                    <div className="space-y-2">
                        <Input
                            variant="secondary"
                            type="text"
                            id="totp"
                            name="totp"
                            size="xl"
                            autoComplete="off"
                            placeholder={msgStr("authenticatorCode")}
                            aria-invalid={messagesPerField.existsError("totp")}
                        />
                        {messagesPerField.existsError("totp") && (
                            <span
                                id="input-error-otp-code"
                                className="text-xs text-destructive"
                                aria-live="polite"
                                dangerouslySetInnerHTML={{
                                    __html: kcSanitize(messagesPerField.get("totp"))
                                }}
                            />
                        )}
                        <input type="hidden" id="totpSecret" name="totpSecret" value={totp.totpSecret} />
                        {mode && <input type="hidden" id="mode" value={mode} />}
                    </div>

                    <div className="space-y-2">
                        <Input
                            variant="secondary"
                            type="text"
                            id="userLabel"
                            name="userLabel"
                            size="xl"
                            autoComplete="off"
                            placeholder={msgStr("loginTotpDeviceName")}
                            aria-invalid={messagesPerField.existsError("userLabel")}
                        />
                        {messagesPerField.existsError("userLabel") && (
                            <span
                                id="input-error-otp-label"
                                className="text-xs text-destructive"
                                aria-live="polite"
                                dangerouslySetInnerHTML={{
                                    __html: kcSanitize(messagesPerField.get("userLabel"))
                                }}
                            />
                        )}
                    </div>

                    <LogoutOtherSessions i18n={i18n} />

                    <div className="flex gap-2">
                        <Button type="submit" size="xl" className="flex-1" id="saveTOTPBtn">
                            {msgStr("doSubmit")}
                        </Button>
                        {isAppInitiatedAction && (
                            <Button type="submit" variant="outline" size="xl" className="flex-1" id="cancelTOTPBtn" name="cancel-aia" value="true">
                                {msg("doCancel")}
                            </Button>
                        )}
                    </div>
                </form>
            </>
        </Template>
    );
}

function LogoutOtherSessions(props: { i18n: I18n }) {
    const { i18n } = props;
    const { msg } = i18n;

    return (
        <div id="kc-form-options" className="flex items-center gap-2">
            <Checkbox id="logout-sessions" name="logout-sessions" value="on" defaultChecked />
            <Label htmlFor="logout-sessions" className="cursor-pointer text-xs">
                {msg("logoutOtherSessions")}
            </Label>
        </div>
    );
}
