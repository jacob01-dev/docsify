import MaxWidthWrapper from "./MaxWidthWrapper";
import GridPattern from "./AnimatedGridPattern";
import { cn } from "@/lib/utils";

const IntegrateSection = (): JSX.Element => {
  return (
    <MaxWidthWrapper className="relative flex flex-col lg:flex-row h-screen w-full max-w-full items-center justify-center overflow-hidden rounded-lg border bg-background p-4 md:shadow-xl">
      <div className="w-1/2 h-[50%]">
        <GridPattern
          numSquares={40}
          maxOpacity={0.7}
          duration={2}
          repeatDelay={3}
          className={cn(
            "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)] ",
            "inset-x-0 inset-y-[-50%] h-[100%] w-full skew-y-[15deg] md:h-[110%] lg:w-[50%] lg:h-[200%] lg:-skew-y-12"
          )}
        />
      </div>
      <div className="w-full lg:w-[50%] flex items-center justify-center flex-col gap-y-12">
        <h1 className="text-white text-4xl font-medium  text-center">
          Integrate Docsify with your Code Documentation
        </h1>
        <div className="grid grid-flow-row min-h-[200px] min-w-[100%] lg:min-h-[50px] lg:min-w-[80%] bg-accent/20 rounded-xl border border-border box-border">
          <div className="row-span-1 w-full py-4 px-4 border-b border-border">
            <h3 className="text-muted-foreground">HTML</h3>
          </div>
          <div className="row-span-2 flex-row">
            <div className="w-full py-6 px-6">
              <code className="text-xl tracking-tight text-muted-foreground flex flex-col">
                <span className="text-muted-foreground/50">{`<!-- Add the following script tag to your HTML file. -->`}</span>
                <span>
                  &lt;script
                  src="https://cdn.jsdelivr.net/npm/docsify@4/lib/docsify.min.js"&gt;&lt;/script&gt;
                </span>
                <span className="text-muted-foreground/50">{`<!-- Initialize your chatbot -->`}</span>
                <span>
                  &lt;Docsify
                  data-chatbotkey="your-docsify-chatbot-key"&gt;&lt;/Docsify&gt;
                </span>
              </code>
            </div>
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default IntegrateSection;
