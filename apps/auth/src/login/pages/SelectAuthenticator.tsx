import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "@mergeium/ui/components/button";
import Template from "../Template";

export default function SelectAuthenticator(props: { kcContext: Extract<KcContext, { pageId: "select-authenticator.ftl" }>; i18n: I18n }) {
    const { kcContext, i18n } = props;
    const { url, auth } = kcContext;

    const { msg, advancedMsg } = i18n;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            displayInfo={false}
            headerNode={msg("loginChooseAuthenticator")}
        >
            <form id="kc-select-credential-form" action={url.loginAction} method="post" className="space-y-2">
                {auth.authenticationSelections.map((authenticationSelection, i) => (
                    <Button
                        key={i}
                        variant="outline"
                        size="xl"
                        className="flex h-auto w-full items-center justify-start gap-4 p-4 text-left"
                        type="submit"
                        name="authenticationExecution"
                        value={authenticationSelection.authExecId}
                    >
                        <div className="flex-1">
                            <div className="font-medium">{advancedMsg(authenticationSelection.displayName)}</div>
                            <div className="text-sm text-muted-foreground">{advancedMsg(authenticationSelection.helpText)}</div>
                        </div>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="shrink-0 text-muted-foreground"
                        >
                            <path d="m9 18 6-6-6-6" />
                        </svg>
                    </Button>
                ))}
            </form>
        </Template>
    );
}
