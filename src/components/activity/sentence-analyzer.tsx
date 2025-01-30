import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";

interface SentenceAnalyzerProps {
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

const SentenceAnalyzer = ({
  sentence = "Running in the park for 30 minutes",
  analysis = {
    tokens: [
      { text: "Running", type: "VERB", confidence: 0.95 },
      { text: "in", type: "ADP", confidence: 0.99 },
      { text: "the", type: "DET", confidence: 0.99 },
      { text: "park", type: "NOUN", confidence: 0.92 },
      { text: "for", type: "ADP", confidence: 0.98 },
      { text: "30", type: "NUM", confidence: 0.99 },
      { text: "minutes", type: "NOUN", confidence: 0.97 },
    ],
    entities: [
      { text: "30 minutes", type: "DURATION", start: 19, end: 29 },
      { text: "park", type: "LOCATION", start: 12, end: 16 },
    ],
    sentiment: {
      score: 0.6,
      label: "positive",
    },
  },
}: SentenceAnalyzerProps) => {
  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.9) return "bg-green-100";
    if (confidence >= 0.7) return "bg-yellow-100";
    return "bg-red-100";
  };

  const getSentimentColor = (label: string) => {
    switch (label) {
      case "positive":
        return "bg-green-100 text-green-800";
      case "negative":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className="w-full bg-white shadow-sm">
      <CardContent className="p-6 space-y-6">
        {/* Original Sentence */}
        <div className="text-lg font-medium text-gray-900">{sentence}</div>

        <Separator />

        {/* Token Analysis */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold">Token Analysis</h3>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="w-4 h-4 text-gray-500" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Breakdown of sentence into linguistic tokens</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="flex flex-wrap gap-2">
            {analysis.tokens.map((token, index) => (
              <TooltipProvider key={index}>
                <Tooltip>
                  <TooltipTrigger>
                    <Badge
                      variant="secondary"
                      className={`${getConfidenceColor(token.confidence)}`}
                    >
                      {token.text}
                      <span className="ml-1 text-xs text-gray-500">
                        {token.type}
                      </span>
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Confidence: {(token.confidence * 100).toFixed(1)}%</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
        </div>

        {/* Named Entities */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold">Named Entities</h3>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="w-4 h-4 text-gray-500" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Identified entities in the sentence</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="flex flex-wrap gap-2">
            {analysis.entities.map((entity, index) => (
              <Badge
                key={index}
                variant="outline"
                className="border-2 border-blue-200"
              >
                {entity.text}
                <span className="ml-1 text-xs text-gray-500">
                  {entity.type}
                </span>
              </Badge>
            ))}
          </div>
        </div>

        {/* Sentiment Analysis */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold">Sentiment</h3>
            <Badge
              variant="secondary"
              className={`${getSentimentColor(analysis.sentiment.label)}`}
            >
              {analysis.sentiment.label}
              <span className="ml-1">
                ({(analysis.sentiment.score * 100).toFixed(0)}%)
              </span>
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SentenceAnalyzer;
