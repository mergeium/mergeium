import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import Template from "../Template";
import { Button } from "@mergeium/ui/components/button";

export default function Info(props: { kcContext: Extract<KcContext, { pageId: "info.ftl" }>; i18n: I18n }) {
    const { kcContext, i18n } = props;

    const { advancedMsgStr, msg } = i18n;

    const { messageHeader, message, requiredActions, skipLink, pageRedirectUri, actionUri, client } = kcContext;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            displayMessage={false}
            headerNode={
                <span
                    dangerouslySetInnerHTML={{
                        __html: kcSanitize(messageHeader ? advancedMsgStr(messageHeader) : message.summary)
                    }}
                />
            }
        >
            <div className="space-y-3">
                <p
                    className="text-center text-sm text-muted-foreground"
                    dangerouslySetInnerHTML={{
                        __html: kcSanitize(
                            (() => {
                                let html = message.summary?.trim();

                                if (requiredActions) {
                                    html += " <b>";

                                    html += requiredActions.map(requiredAction => advancedMsgStr(`requiredAction.${requiredAction}`)).join(", ");

                                    html += "</b>";
                                }

                                return html;
                            })()
                        )
                    }}
                />
                {(() => {
                    if (skipLink) {
                        return null;
                    }

                    if (pageRedirectUri) {
                        return (
                            <Button variant="ghost" size="xl" className="w-full font-normal text-muted-foreground" asChild>
                                <a href={pageRedirectUri}>{msg("backToApplication")}</a>
                            </Button>
                        );
                    }
                    if (actionUri) {
                        return (
                            <Button variant="ghost" size="xl" className="w-full font-normal text-muted-foreground" asChild>
                                <a href={actionUri}>{msg("proceedWithAction")}</a>
                            </Button>
                        );
                    }

                    if (client.baseUrl) {
                        return (
                            <Button variant="ghost" size="xl" className="w-full font-normal text-muted-foreground" asChild>
                                <a href={client.baseUrl}>{msg("backToApplication")}</a>
                            </Button>
                        );
                    }
                })()}
            </div>
        </Template>
    );
}
