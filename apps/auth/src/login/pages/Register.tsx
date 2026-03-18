import { useLayoutEffect } from "react";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import Template from "../Template";
import { Input } from "@mergeium/ui/components/input";
import { Button } from "@mergeium/ui/components/button";
import { Checkbox } from "@mergeium/ui/components/checkbox";
import { Label } from "@mergeium/ui/components/label";

export default function Register(props: { kcContext: Extract<KcContext, { pageId: "register.ftl" }>; i18n: I18n }) {
    const { kcContext, i18n } = props;

    const {
        messageHeader,
        url,
        messagesPerField,
        recaptchaRequired,
        recaptchaVisible,
        recaptchaSiteKey,
        recaptchaAction,
        termsAcceptanceRequired,
        realm
    } = kcContext;

    const { msg, msgStr, advancedMsg } = i18n;

    useLayoutEffect(() => {
        (window as any)["onSubmitRecaptcha"] = () => {
            (document.getElementById("kc-register-form") as HTMLFormElement).requestSubmit();
        };
        return () => {
            delete (window as any)["onSubmitRecaptcha"];
        };
    }, []);

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            headerNode={messageHeader !== undefined ? advancedMsg(messageHeader) : msg("registerTitle")}
            displayMessage={messagesPerField.exists("global")}
            displayRequiredFields
        >
            <form id="kc-register-form" className="space-y-4" action={url.registrationAction} method="post">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="firstName">{msg("firstName")} <span className="text-destructive">*</span></Label>
                        <Input
                            variant="secondary"
                            id="firstName"
                            name="firstName"
                            size="xl"
                            defaultValue={kcContext.profile?.attributesByName?.firstName?.value ?? ""}
                            aria-invalid={messagesPerField.existsError("firstName")}
                        />
                        {messagesPerField.existsError("firstName") && (
                            <p className="text-xs text-destructive">{messagesPerField.get("firstName")}</p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="lastName">{msg("lastName")} <span className="text-destructive">*</span></Label>
                        <Input
                            variant="secondary"
                            id="lastName"
                            name="lastName"
                            size="xl"
                            defaultValue={kcContext.profile?.attributesByName?.lastName?.value ?? ""}
                            aria-invalid={messagesPerField.existsError("lastName")}
                        />
                        {messagesPerField.existsError("lastName") && (
                            <p className="text-xs text-destructive">{messagesPerField.get("lastName")}</p>
                        )}
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="email">{msg("email")} <span className="text-destructive">*</span></Label>
                    <Input
                        variant="secondary"
                        id="email"
                        name="email"
                        type="email"
                        size="xl"
                        autoComplete="email"
                        defaultValue={kcContext.profile?.attributesByName?.email?.value ?? ""}
                        aria-invalid={messagesPerField.existsError("email")}
                    />
                    {messagesPerField.existsError("email") && (
                        <p className="text-xs text-destructive">{messagesPerField.get("email")}</p>
                    )}
                </div>

                {!realm.registrationEmailAsUsername && (
                    <div className="space-y-2">
                        <Label htmlFor="username">{msg("username")} <span className="text-destructive">*</span></Label>
                        <Input
                            variant="secondary"
                            id="username"
                            name="username"
                            size="xl"
                            autoComplete="username"
                            defaultValue={kcContext.profile?.attributesByName?.username?.value ?? ""}
                            aria-invalid={messagesPerField.existsError("username")}
                        />
                        {messagesPerField.existsError("username") && (
                            <p className="text-xs text-destructive">{messagesPerField.get("username")}</p>
                        )}
                    </div>
                )}

                <div className="space-y-2">
                    <Label htmlFor="password">{msg("password")} <span className="text-destructive">*</span></Label>
                    <Input
                        variant="secondary"
                        id="password"
                        name="password"
                        type="password"
                        size="xl"
                        autoComplete="new-password"
                        aria-invalid={messagesPerField.existsError("password")}
                    />
                    {messagesPerField.existsError("password") && (
                        <p className="text-xs text-destructive">{messagesPerField.get("password")}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="password-confirm">{msg("passwordConfirm")} <span className="text-destructive">*</span></Label>
                    <Input
                        variant="secondary"
                        id="password-confirm"
                        name="password-confirm"
                        type="password"
                        size="xl"
                        autoComplete="new-password"
                        aria-invalid={messagesPerField.existsError("password-confirm")}
                    />
                    {messagesPerField.existsError("password-confirm") && (
                        <p className="text-xs text-destructive">{messagesPerField.get("password-confirm")}</p>
                    )}
                </div>

                {termsAcceptanceRequired && (
                    <TermsAcceptance i18n={i18n} messagesPerField={messagesPerField} />
                )}

                {recaptchaRequired && (recaptchaVisible || recaptchaAction === undefined) && (
                    <div>
                        <div className="g-recaptcha" data-size="compact" data-sitekey={recaptchaSiteKey} data-action={recaptchaAction} />
                    </div>
                )}

                <div className="flex items-center justify-between">
                    <Button variant="link" size="sm" className="px-0" asChild>
                        <a href={url.loginUrl}>{msg("backToLogin")}</a>
                    </Button>

                    {recaptchaRequired && !recaptchaVisible && recaptchaAction !== undefined ? (
                        <Button
                            className="g-recaptcha"
                            data-sitekey={recaptchaSiteKey}
                            data-callback="onSubmitRecaptcha"
                            data-action={recaptchaAction}
                            type="submit"
                            size="xl"
                        >
                            {msg("doRegister")}
                        </Button>
                    ) : (
                        <Button type="submit" size="xl">
                            {msgStr("doRegister")}
                        </Button>
                    )}
                </div>
            </form>
        </Template>
    );
}

function TermsAcceptance(props: {
    i18n: I18n;
    messagesPerField: Pick<KcContext["messagesPerField"], "existsError" | "get">;
}) {
    const { i18n, messagesPerField } = props;
    const { msg } = i18n;

    return (
        <>
            <div className="space-y-2">
                <p className="text-sm font-medium">{msg("termsTitle")}</p>
                <div id="kc-registration-terms-text" className="text-sm text-muted-foreground">{msg("termsText")}</div>
            </div>
            <div className="space-y-2">
                <div className="flex items-center gap-2">
                    <Checkbox
                        id="termsAccepted"
                        name="termsAccepted"
                        aria-invalid={messagesPerField.existsError("termsAccepted")}
                    />
                    <Label htmlFor="termsAccepted" className="text-sm font-normal">
                        {msg("acceptTerms")}
                    </Label>
                </div>
                {messagesPerField.existsError("termsAccepted") && (
                    <span
                        id="input-error-terms-accepted"
                        className="text-sm text-destructive"
                        aria-live="polite"
                        dangerouslySetInnerHTML={{ __html: kcSanitize(messagesPerField.get("termsAccepted")) }}
                    />
                )}
            </div>
        </>
    );
}
