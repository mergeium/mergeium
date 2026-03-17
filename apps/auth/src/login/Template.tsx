import { useEffect } from "react";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { TemplateProps } from "keycloakify/login/TemplateProps";
import { useInitialize } from "keycloakify/login/Template.useInitialize";
import type { I18n } from "./i18n";
import type { KcContext } from "./KcContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@mergeium/ui/components/card";
import { Alert, AlertDescription } from "@mergeium/ui/components/alert";
import { Button } from "@mergeium/ui/components/button";
import { Separator } from "@mergeium/ui/components/separator";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@mergeium/ui/components/select";
import { cn } from "@mergeium/ui/lib/utils";

export default function Template(props: TemplateProps<KcContext, I18n>) {
    const {
        displayInfo = false,
        displayMessage = true,
        displayRequiredFields = false,
        headerNode,
        socialProvidersNode = null,
        infoNode = null,
        documentTitle,
        bodyClassName,
        kcContext,
        i18n,
        doUseDefaultCss,
        classes: _classes,
        children
    } = props;

    const { msg, msgStr, currentLanguage, enabledLanguages } = i18n;
    const { realm, auth, url, message, isAppInitiatedAction } = kcContext;

    useEffect(() => {
        document.title = documentTitle ?? msgStr("loginTitle", realm.displayName || realm.name);
    }, []);

    useEffect(() => {
        if (bodyClassName) {
            document.body.className = bodyClassName;
        }
    }, [bodyClassName]);

    const { isReadyToRender } = useInitialize({ kcContext, doUseDefaultCss });

    if (!isReadyToRender) {
        return null;
    }

    return (
        <div className={cn("flex min-h-screen items-center justify-center bg-background p-4")}>
            <Card className="w-full max-w-md">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div className="space-y-1">
                            {(() => {
                                if (auth !== undefined && auth.showUsername && !auth.showResetCredentials) {
                                    return (
                                        <div className="flex items-center gap-2">
                                            <CardTitle className="text-base">{auth.attemptedUsername}</CardTitle>
                                            <Button variant="link" size="xs" asChild>
                                                <a href={url.loginRestartFlowUrl} aria-label={msgStr("restartLoginTooltip")}>
                                                    {msg("restartLoginTooltip")}
                                                </a>
                                            </Button>
                                        </div>
                                    );
                                }
                                return <CardTitle className="text-base">{headerNode}</CardTitle>;
                            })()}
                            {displayRequiredFields && (
                                <CardDescription>
                                    <span className="text-destructive">*</span> {msg("requiredFields")}
                                </CardDescription>
                            )}
                        </div>
                        {enabledLanguages.length > 1 && (
                            <Select
                                value={currentLanguage.languageTag}
                                onValueChange={languageTag => {
                                    const target = enabledLanguages.find(l => l.languageTag === languageTag);
                                    if (target) {
                                        window.location.href = target.href;
                                    }
                                }}
                            >
                                <SelectTrigger size="sm" className="w-auto">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {enabledLanguages.map(({ languageTag, label }) => (
                                        <SelectItem key={languageTag} value={languageTag}>
                                            {label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        )}
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    {displayMessage && message !== undefined && (message.type !== "warning" || !isAppInitiatedAction) && (
                        <Alert variant={message.type === "error" ? "destructive" : "default"}>
                            <AlertDescription>
                                <span dangerouslySetInnerHTML={{ __html: kcSanitize(message.summary) }} />
                            </AlertDescription>
                        </Alert>
                    )}
                    {children}
                    {auth !== undefined && auth.showTryAnotherWayLink && (
                        <form id="kc-select-try-another-way-form" action={url.loginAction} method="post">
                            <input type="hidden" name="tryAnotherWay" value="on" />
                            <Button
                                variant="link"
                                size="sm"
                                className="px-0"
                                onClick={() => {
                                    (document.getElementById("kc-select-try-another-way-form") as HTMLFormElement).requestSubmit();
                                }}
                            >
                                {msg("doTryAnotherWay")}
                            </Button>
                        </form>
                    )}
                    {socialProvidersNode && (
                        <>
                            <Separator />
                            {socialProvidersNode}
                        </>
                    )}
                    {displayInfo && infoNode && (
                        <>
                            <Separator />
                            <div className="text-center text-xs text-muted-foreground">{infoNode}</div>
                        </>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
