import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import Template from "../Template";

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
                    className="text-sm text-muted-foreground"
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
                            <p className="text-center text-sm text-muted-foreground">
                                <a href={pageRedirectUri} className="underline hover:text-foreground">{msg("backToApplication")}</a>
                            </p>
                        );
                    }
                    if (actionUri) {
                        return (
                            <p className="text-center text-sm text-muted-foreground">
                                <a href={actionUri} className="underline hover:text-foreground">{msg("proceedWithAction")}</a>
                            </p>
                        );
                    }

                    if (client.baseUrl) {
                        return (
                            <p className="text-center text-sm text-muted-foreground">
                                <a href={client.baseUrl} className="underline hover:text-foreground">{msg("backToApplication")}</a>
                            </p>
                        );
                    }
                })()}
            </div>
        </Template>
    );
}
