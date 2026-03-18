import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import Template from "../Template";

export default function Code(props: { kcContext: Extract<KcContext, { pageId: "code.ftl" }>; i18n: I18n }) {
    const { kcContext, i18n } = props;

    const { code } = kcContext;

    const { msg } = i18n;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            headerNode={code.success ? msg("codeSuccessTitle") : msg("codeErrorTitle", code.error)}
        >
            <div className="space-y-3">
                {code.success ? (
                    <>
                        <p className="text-sm text-muted-foreground">{msg("copyCodeInstruction")}</p>
                        <input
                            id="code"
                            className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                            defaultValue={code.code}
                            readOnly
                        />
                    </>
                ) : (
                    code.error && (
                        <p
                            id="error"
                            className="text-xs text-destructive"
                            dangerouslySetInnerHTML={{
                                __html: kcSanitize(code.error)
                            }}
                        />
                    )
                )}
            </div>
        </Template>
    );
}
