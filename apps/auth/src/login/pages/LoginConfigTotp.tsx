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

    const { msg, msgStr, advancedMsg } = i18n;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            headerNode={msg("loginTotpTitle")}
            displayMessage={!messagesPerField.existsError("totp", "userLabel")}
        >
            <>
                <ol className="list-decimal space-y-4 pl-5 text-sm">
                    <li>
                        <p>{msg("loginTotpStep1")}</p>
                        <ul className="mt-1 list-disc pl-5">
                            {totp.supportedApplications.map(app => (
                                <li key={app}>{advancedMsg(app)}</li>
                            ))}
                        </ul>
                    </li>

                    {mode == "manual" ? (
                        <>
                            <li>
                                <p>{msg("loginTotpManualStep2")}</p>
                                <p className="my-2">
                                    <span id="kc-totp-secret-key" className="font-mono text-base font-semibold">
                                        {totp.totpSecretEncoded}
                                    </span>
                                </p>
                                <p>
                                    <a href={totp.qrUrl} id="mode-barcode" className="text-primary underline">
                                        {msg("loginTotpScanBarcode")}
                                    </a>
                                </p>
                            </li>
                            <li>
                                <p>{msg("loginTotpManualStep3")}</p>
                                <ul className="mt-1 list-disc pl-5">
                                    <li id="kc-totp-type">
                                        {msg("loginTotpType")}: {msg(`loginTotp.${totp.policy.type}`)}
                                    </li>
                                    <li id="kc-totp-algorithm">
                                        {msg("loginTotpAlgorithm")}: {totp.policy.getAlgorithmKey()}
                                    </li>
                                    <li id="kc-totp-digits">
                                        {msg("loginTotpDigits")}: {totp.policy.digits}
                                    </li>
                                    {totp.policy.type === "totp" ? (
                                        <li id="kc-totp-period">
                                            {msg("loginTotpInterval")}: {totp.policy.period}
                                        </li>
                                    ) : (
                                        <li id="kc-totp-counter">
                                            {msg("loginTotpCounter")}: {totp.policy.initialCounter}
                                        </li>
                                    )}
                                </ul>
                            </li>
                        </>
                    ) : (
                        <li>
                            <p>{msg("loginTotpStep2")}</p>
                            <img
                                id="kc-totp-secret-qr-code"
                                src={`data:image/png;base64, ${totp.totpSecretQrCode}`}
                                alt="Figure: Barcode"
                                className="my-4"
                            />
                            <p>
                                <a href={totp.manualUrl} id="mode-manual" className="text-primary underline">
                                    {msg("loginTotpUnableToScan")}
                                </a>
                            </p>
                        </li>
                    )}
                    <li>
                        <p>{msg("loginTotpStep3")}</p>
                        <p>{msg("loginTotpStep3DeviceName")}</p>
                    </li>
                </ol>

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
                        <Button type="submit" size="xl" className="flex-1 w-full" id="saveTOTPBtn">
                            {msgStr("doSubmit")}
                        </Button>
                        {isAppInitiatedAction && (
                            <Button type="submit" variant="outline" size="xl" className="flex-1 w-full" id="cancelTOTPBtn" name="cancel-aia" value="true">
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
            <Label htmlFor="logout-sessions" className="cursor-pointer text-sm">
                {msg("logoutOtherSessions")}
            </Label>
        </div>
    );
}
