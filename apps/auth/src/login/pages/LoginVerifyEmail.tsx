import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import Template from "../Template";

export default function LoginVerifyEmail(props: { kcContext: Extract<KcContext, { pageId: "login-verify-email.ftl" }>; i18n: I18n }) {
    const { kcContext, i18n } = props;

    const { msg } = i18n;

    const { url, user } = kcContext;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            displayInfo
            headerNode={msg("emailVerifyTitle")}
            infoNode={
                <p className="text-center text-sm text-muted-foreground">
                    {msg("emailVerifyInstruction2")}
                    <br />
                    <a className="font-medium text-primary hover:underline underline-offset-4 hover:text-primary/80" href={url.loginAction}>
                        {msg("doClickHere")}
                    </a>
                    &nbsp;
                    {msg("emailVerifyInstruction3")}
                </p>
            }
        >
            <p className="text-center text-sm text-muted-foreground">{msg("emailVerifyInstruction1", user?.email ?? "")}</p>
        </Template>
    );
}
