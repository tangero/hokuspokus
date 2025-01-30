import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, RefreshCw } from "lucide-react";
import SentenceAnalyzer from "./sentence-analyzer";

interface ActivityInputPanelProps {
  onAnalyze?: (text: string) => void;
  onReset?: () => void;
  isAnalyzing?: boolean;
  sentence?: string;
  analysis?: {
    tokens: Array<{
      text: string;
      type: string;
      confidence: number;
    }>;
    entities: Array<{
      text: string;
      type: string;
      start: number;
      end: number;
    }>;
    sentiment: {
      score: number;
      label: "positive" | "negative" | "neutral";
    };
  };
}

const ActivityInputPanel = ({
  onAnalyze = () => {},
  onReset = () => {},
  isAnalyzing = false,
  sentence = "",
  analysis = {
    tokens: [
      { text: "Example", type: "NOUN", confidence: 0.95 },
      { text: "sentence", type: "NOUN", confidence: 0.92 },
    ],
    entities: [{ text: "Example", type: "TERM", start: 0, end: 7 }],
    sentiment: {
      score: 0.5,
      label: "neutral",
    },
  },
}: ActivityInputPanelProps) => {
  const [inputText, setInputText] = React.useState(sentence);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAnalyze(inputText);
  };

  const handleReset = () => {
    setInputText("");
    onReset();
  };

  return (
    <div className="w-full space-y-6 bg-gray-50 p-6 rounded-lg">
      <Card className="bg-white">
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Textarea
              placeholder="Enter a sentence to analyze..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-[100px] resize-none"
            />
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleReset}
                disabled={isAnalyzing}
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Reset
              </Button>
              <Button type="submit" disabled={!inputText.trim() || isAnalyzing}>
                <Send className="w-4 h-4 mr-2" />
                Analyze
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {sentence && <SentenceAnalyzer sentence={sentence} analysis={analysis} />}
    </div>
  );
};

export default ActivityInputPanel;
