import { MouseEvent, useRef, useState } from "react";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "@mergeium/ui/components/button";
import { cn } from "@mergeium/ui/lib/utils";
import Template from "../Template";

export default function SelectOrganization(props: { kcContext: Extract<KcContext, { pageId: "select-organization.ftl" }>; i18n: I18n }) {
    const { kcContext, i18n } = props;

    const { url, user } = kcContext;

    const { msg } = i18n;

    const [isSubmitting, setIsSubmitting] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);
    const organizationInputRef = useRef<HTMLInputElement>(null);

    const onOrganizationClick = (organizationAlias: string) => (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        if (!organizationInputRef.current || !formRef.current) {
            return;
        }

        organizationInputRef.current.value = organizationAlias;
        setIsSubmitting(true);

        if (typeof formRef.current.requestSubmit === "function") {
            formRef.current.requestSubmit();
            return;
        }

        formRef.current.submit();
    };

    const organizations = user.organizations ?? [];
    const shouldDisplayGrid = organizations.length > 3;

    return (
        <Template kcContext={kcContext} i18n={i18n} headerNode={null}>
            <form ref={formRef} action={url.loginAction} method="post">
                <div id="kc-user-organizations" className="space-y-4">
                    <h2 className="text-lg font-semibold">{msg("organization.select")}</h2>
                    <div className={cn("grid gap-2", shouldDisplayGrid ? "grid-cols-2" : "grid-cols-1")}>
                        {organizations.map(({ alias, name }) => (
                            <Button
                                key={alias}
                                id={`organization-${alias}`}
                                variant="outline"
                                className="h-auto w-full justify-start p-4"
                                type="button"
                                onClick={onOrganizationClick(alias)}
                                disabled={isSubmitting}
                            >
                                {name ?? alias}
                            </Button>
                        ))}
                    </div>
                </div>
                <input ref={organizationInputRef} type="hidden" name="kc.org" />
            </form>
        </Template>
    );
}
