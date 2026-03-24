import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import Template from "../Template";
import { Input } from "@mergeium/ui/components/input";
import { Alert, AlertDescription } from "@mergeium/ui/components/alert";

export default function Code(props: { kcContext: Extract<KcContext, { pageId: "code.ftl" }>; i18n: I18n }) {
    const { kcContext, i18n } = props;

    const { code } = kcContext;

    const { msg } = i18n;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            displayMessage={false}
            headerNode={msg(code.success ? "codeSuccessTitle" : "errorTitle")}
        >
            <div className="space-y-3">
                {code.success ? (
                    <Input
                        id="code"
                        variant="secondary"
                        size="xl"
                        className="text-center font-mono text-lg tracking-widest"
                        defaultValue={code.code}
                        readOnly
                        copyable
                    />
                ) : (
                    code.error && (
                        <Alert variant="destructive">
                            <AlertDescription>
                                <span dangerouslySetInnerHTML={{ __html: kcSanitize(code.error) }} />
                            </AlertDescription>
                        </Alert>
                    )
                )}
            </div>
        </Template>
    );
}
