"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const testimonials = [
    {
        name: "Abdul Rahman",
        avatar: "A",
        title: "Software Engineer",
        description: "This application does handle a need I have been looking for and I'm very glad I got in on a lifetime plan!"
    },
    {
        name: "Aamir Jafar",
        avatar: "A",
        title: "Project Manager",
        description: "It helped me create personalized content for my online store!"
    },
    {
        name: "Dr Erin",
        avatar: "E",
        title: "Team Head of Biomedical Engineering",
        description: "I have a super positive experience with this app. They are really responsive, I always get all the answers to my questions vewy quickly."
    },
    {
        name: "Philip Black",
        avatar: "P",
        title: "Value Builder System",
        description: "Interesting product with all the features we need that are not currently supported by other software owned."
    },
    
]

export const LandingContent = () => {
    return (
        <div className="px-10 pb-20">
            <h2 className="text-center text-4xl text-white font-extrabold mb-10">
                Testimonials
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {testimonials.map((item) => (
                    <Card key={item.description} className="bg-[#192339] border-none text-white">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-x-2">
                                <div>
                                    <p className="text-lg">{item.name}</p>
                                    <p className="text-zinc-400 text-sm">{item.title}</p>
                                </div>
                            </CardTitle>
                            <CardContent className="pt-4 px-0">
                                {item.description}
                            </CardContent>
                        </CardHeader>
                    </Card>
                ))}
            </div>
        </div>
    )

}