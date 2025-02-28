'use client';

import { useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { AlertTriangle, ExternalLink } from 'lucide-react';

// Define types for the API specification
interface ApiMethod {
  method: string;
  summary: string;
  description?: string;
  requestBody?: {
    content: Record<string, {
      schema?: {
        type: string;
        required?: string[];
        properties?: Record<string, {
          type: string;
          format?: string;
          description?: string;
        }>;
      };
    }>;
  };
  parameters?: Array<{
    name: string;
    in: string;
    required: boolean;
    schema: {
      type: string;
      description: string;
    };
  }>;
}

// OpenAPI specification
const apiSpec = {
  paths: {
    "/": {
      get: {
        summary: "Root",
        description: "Returns the root endpoint information"
      }
    },
    "/health": {
      get: {
        summary: "Health Check",
        description: "Check if the API is up and running"
      }
    },
    "/check-image": {
      post: {
        summary: "Check Image",
        description: "Extracts Text from an image",
        requestBody: {
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                required: ["file"],
                properties: {
                  file: {
                    type: "string",
                    format: "binary",
                    description: "The image file to analyze"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/extract-url": {
      post: {
        summary: "Check URL",
        description: "Extracts Claims and Ingredients from a URL",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["url"],
                properties: {
                  url: {
                    type: "string",
                    description: "The URL to extract content from"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/manual-check": {
      post: {
        summary: "Manual Check",
        description: "Manually input claims and ingredients for verification",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["claims", "ingredients"],
                properties: {
                  claims: {
                    type: "string",
                    description: "The claims to verify"
                  },
                  ingredients: {
                    type: "string",
                    description: "The ingredients list to check against"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/check-raw": {
      post: {
        summary: "Check Raw Text",
        description: "Verify claims from raw text input",
        parameters: [
          {
            name: "raw_text",
            in: "query",
            required: true,
            schema: {
              type: "string",
              description: "Raw text to analyze"
            }
          }
        ]
      }
    },
    "/suggestions": {
      post: {
        summary: "Suggestions",
        description: "Get suggestions based on claims and ingredients",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["claims", "ingredients"],
                properties: {
                  claims: {
                    type: "string",
                    description: "The claims to analyze"
                  },
                  ingredients: {
                    type: "string",
                    description: "The ingredients list to analyze"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/check-health": {
      post: {
        summary: "Check Health",
        description: "Analyze health data and provide recommendations",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["age", "height", "weight", "gender", "activity_level", "sleep", "stress"],
                properties: {
                  age: {
                    type: "integer",
                    description: "Age in years"
                  },
                  height: {
                    type: "number",
                    description: "Height in centimeters"
                  },
                  weight: {
                    type: "number",
                    description: "Weight in kilograms"
                  },
                  gender: {
                    type: "string",
                    description: "Gender identity"
                  },
                  activity_level: {
                    type: "string",
                    description: "Activity level"
                  },
                  medical_conditions: {
                    type: "string",
                    description: "Any existing medical conditions"
                  },
                  medications: {
                    type: "string",
                    description: "Current medications"
                  },
                  diet: {
                    type: "string",
                    description: "Description of typical diet"
                  },
                  sleep: {
                    type: "number",
                    description: "Average hours of sleep per day"
                  },
                  stress: {
                    type: "integer",
                    description: "Stress level on a scale of 1-10"
                  },
                  exercise: {
                    type: "string",
                    description: "Description of exercise routine"
                  }
                }
              }
            }
          }
        }
      }
    }
  }
};

export default function APIDocs() {
  const [activeEndpoint, setActiveEndpoint] = useState<string | undefined>(undefined);

  const endpoints = Object.entries(apiSpec.paths).map(([path, methods]) => ({
    path,
    methods: Object.entries(methods).map(([method, details]) => ({
      method: method.toUpperCase(),
      ...details
    })) as ApiMethod[]
  }));

  const getEndpointId = (path: string, method: string) => `${method}-${path}`;

  return (
    <div className="w-full py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            API Documentation
          </h2>
          <p className="mt-4 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
            Integrate VeriTrust verification into your applications with our simple and powerful API
          </p>
        </div>

        <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-lg mb-8">
          <div className="flex">
            <AlertTriangle className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-amber-800 font-medium">
                Deployment Notice
              </p>
              <p className="text-sm text-amber-700 mt-1">
                URL Verification route will only work locally, as our backend is running on a serverless instance. 
                We could have hosted on AWS EC2 but still needed a valid SSL certificate to get HTTPS.
              </p>
            </div>
          </div>
        </div>

        <div className="mb-8 p-6 border rounded-lg bg-card">
          <div className="flex items-start md:items-center flex-col md:flex-row justify-between">
            <div>
              <h3 className="text-xl font-medium mb-2">Interactive Swagger Documentation</h3>
              <p className="text-muted-foreground">
                For detailed API documentation including request/response schemas and interactive testing, 
                please visit our Swagger documentation.
              </p>
            </div>
            <Button className="mt-4 md:mt-0" asChild>
              <a href="https://veritrust-backend.vercel.app/docs" target="_blank" rel="noopener noreferrer" className="flex items-center">
                <ExternalLink className="mr-2 h-4 w-4" />
                Open Swagger Docs
              </a>
            </Button>
          </div>
        </div>

        <div className="mt-8 border rounded-lg overflow-hidden p-6 bg-background">
          <h3 className="text-xl font-medium mb-6">Available Endpoints</h3>
          <Accordion 
            type="single" 
            collapsible 
            value={activeEndpoint}
            onValueChange={setActiveEndpoint}
            className="w-full"
          >
            {endpoints.map(({ path, methods }) => (
              methods.map(method => {
                const id = getEndpointId(path, method.method);
                return (
                  <AccordionItem key={id} value={id} className="border border-border rounded-md mb-4 overflow-hidden bg-card">
                    <AccordionTrigger className="px-4 py-3 hover:bg-muted/50 w-full">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center w-full text-left">
                        <div className="flex items-center">
                          <span className={`inline-block px-2 py-1 text-xs font-medium rounded mr-3 ${
                            method.method === 'GET' ? 'bg-blue-100 text-blue-800' : 
                            method.method === 'POST' ? 'bg-green-100 text-green-800' : 
                            method.method === 'PUT' ? 'bg-yellow-100 text-yellow-800' : 
                            method.method === 'DELETE' ? 'bg-red-100 text-red-800' : 
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {method.method}
                          </span>
                          <span className="font-mono text-sm">{path}</span>
                        </div>
                        <span className="text-sm text-muted-foreground sm:ml-4 mt-1 sm:mt-0">
                          {method.summary}
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 py-3 bg-card">
                      <div className="space-y-4">
                        {method.description && (
                          <div>
                            <h4 className="text-sm font-medium mb-1">Description</h4>
                            <p className="text-sm text-muted-foreground">{method.description}</p>
                          </div>
                        )}
                        
                        <div>
                          <p className="text-sm text-muted-foreground">
                            For detailed information about request parameters, response schemas, and interactive testing, 
                            please refer to the <a href="https://veritrust-backend.vercel.app/docs" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Swagger documentation</a>.
                          </p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                );
              })
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}
