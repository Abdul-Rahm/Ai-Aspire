import * as z from "zod";

export const formSchema = z.object({
    prompt: z.string().min(1, {
        message: "Mail Prompt is required",
    }),
    amount: z.string().min(1),
    resolution: z.string().min(1)
});

export const toneOptions = [
    {
        value: "Appreciative",
        label: "Appreciative",
    },
    {
        value: "Assertive",
        label: "Assertive",
    },
    {
        value: "Candid",
        label: "Candid"
    },
    {
        value: "Casual",
        label: "Casual"
    },
    {
        value: "Compassionate",
        label: "Compassionate"
    },
    {
        value:"Convincing",
        label:"Convincing"
    },
    {
        value:"Critical",
        label:"Critical"
    },
    {
        value:"Enthusiastic",
        label:"Enthusiastic"
    },
    {
        value:"Formal",
        label:"Formal"
    },
    {
        value:"Humble",
        label:"Humble"
    },
    {
        value:"Informative",
        label:"Informative"
    },
    {
        value:"Inspirational",
        label:"Inspirational"
    },
    {
        value:"Joyful",
        label:"Joyful"
    },
    {
        value:"Thoughtful",
        label:"Thoughtful"
    },
    {
        value:"Passionate",
        label:"Passionate"
    },
    {
        value:"Urgent",
        label:"Urgent"
    },
    {
        value:"Worried",
        label:"Worried"
    },
 
];

export const variantOptions = [
    {
        value: "1 variant",
        label: "1 variant",
    },
    {
        value: "2 variants",
        label: "2 variants",
    },
    {
        value: "3 variants",
        label: "3 variants"
    }
];