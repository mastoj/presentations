import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FileText, Video } from "lucide-react";
import Link from "next/link";
import type { Presentation } from "../data/presentations";

export function PresentationCard({
  presentation,
}: {
  presentation: Presentation;
}) {
  return (
    <Card className="flex flex-col h-full border-secondary">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">
          {presentation.title}
        </CardTitle>
        <CardDescription className="text-xs text-muted-foreground">
          {presentation.date} -{" "}
          <span className="font-bold text-white">{presentation.event}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground">
          {presentation.description}
        </p>
      </CardContent>
      <CardFooter className="flex flex-wrap gap-2 pt-4 border-t border-secondary">
        {presentation.recordingUrl && (
          <Link
            href={presentation.recordingUrl}
            passHref
            className={buttonVariants({ variant: "outline" })}
          >
            <Video className="mr-2 h-3 w-3" />
            Recording
          </Link>
        )}
        {presentation.slidesUrl && (
          <Link
            href={presentation.slidesUrl}
            passHref
            className={buttonVariants({ variant: "outline" })}
          >
            <FileText className="mr-2 h-3 w-3" />
            Slides
          </Link>
        )}
      </CardFooter>
    </Card>
  );
}
