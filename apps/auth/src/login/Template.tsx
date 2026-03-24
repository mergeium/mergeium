import { useEffect } from "react";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import { useInitialize } from "keycloakify/login/Template.useInitialize";
import type { I18n } from "./i18n";
import type { KcContext } from "./KcContext";
import { Alert, AlertDescription } from "@mergeium/ui/components/alert";
import { Button } from "@mergeium/ui/components/button";

type TemplateProps = {
    kcContext: KcContext;
    i18n: I18n;
    displayInfo?: boolean;
    displayMessage?: boolean;
    displayRequiredFields?: boolean;
    headerNode?: React.ReactNode;
    socialProvidersNode?: React.ReactNode;
    infoNode?: React.ReactNode;
    documentTitle?: string;
    bodyClassName?: string;
    children: React.ReactNode;
};

export default function Template(props: TemplateProps) {
    const {
        displayInfo = false,
        displayMessage = true,
        headerNode,
        socialProvidersNode = null,
        infoNode = null,
        documentTitle,
        bodyClassName,
        kcContext,
        i18n,
        children
    } = props;

    const { msg, msgStr } = i18n;
    const { realm, auth, url, message, isAppInitiatedAction } = kcContext;

    useEffect(() => {
        document.title = documentTitle ?? msgStr("loginTitle", realm.displayName || realm.name);
    }, []);

    useEffect(() => {
        if (bodyClassName) {
            document.body.className = bodyClassName;
        }
    }, [bodyClassName]);

    const { isReadyToRender } = useInitialize({ kcContext, doUseDefaultCss: false });

    if (!isReadyToRender) {
        return null;
    }

    return (
        <div className="min-h-screen bg-background flex flex-col items-center px-4 py-8">
            <header className="flex items-center justify-center h-20 shrink-0">
                <h1
                    className="text-2xl"
                    style={{ fontFamily: "'Climate Crisis', system-ui" }}
                >
                    mergeium
                </h1>
            </header>
            <div className="flex-1 flex flex-col justify-center w-full max-w-85 space-y-5">
                {headerNode && (
                    <div className="space-y-1">
                        {(() => {
                            if (auth !== undefined && auth.showUsername && !auth.showResetCredentials) {
                                return (
                                    <div className="flex items-center gap-2">
                                        <h2 className="text-lg font-semibold tracking-tight">{auth.attemptedUsername}</h2>
                                        <Button variant="link" size="xs" asChild>
                                            <a href={url.loginRestartFlowUrl} aria-label={msgStr("restartLoginTooltip")}>
                                                {msg("restartLoginTooltip")}
                                            </a>
                                        </Button>
                                    </div>
                                );
                            }
                            return <h2 className="text-lg font-semibold tracking-tight">{headerNode}</h2>;
                        })()}
                    </div>
                )}

                {displayMessage && message !== undefined && (message.type !== "warning" || !isAppInitiatedAction) && (
                    <Alert variant={message.type === "error" ? "destructive" : "default"}>
                        <AlertDescription>
                            <span dangerouslySetInnerHTML={{ __html: kcSanitize(message.summary) }} />
                        </AlertDescription>
                    </Alert>
                )}

                {socialProvidersNode}

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

                {displayInfo && infoNode && (
                    <div className="text-center text-xs text-muted-foreground">{infoNode}</div>
                )}
            </div>
        </div>
    );
}
