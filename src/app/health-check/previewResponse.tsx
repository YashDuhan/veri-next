import { HealthCheckResponse } from '@/app/integration/integration-core';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { AlertCircle, CheckCircle, Info } from 'lucide-react';

interface PreviewResponseProps {
  data: HealthCheckResponse;
}

export default function PreviewResponse({ data }: PreviewResponseProps) {
  // Helper function to get color based on severity or importance
  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'medium':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-300';
      default:
        return 'bg-blue-100 text-blue-800 border-blue-300';
    }
  };

  const getImportanceColor = (importance: string) => {
    switch (importance.toLowerCase()) {
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'important':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'helpful':
        return 'bg-green-100 text-green-800 border-green-300';
      default:
        return 'bg-blue-100 text-blue-800 border-blue-300';
    }
  };

  const getBmiColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'underweight':
        return 'bg-amber-100 text-amber-800';
      case 'normal weight':
        return 'bg-green-100 text-green-800';
      case 'overweight':
        return 'bg-amber-100 text-amber-800';
      case 'obese':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'excellent':
      case 'good':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'fair':
        return <Info className="h-5 w-5 text-amber-500" />;
      case 'poor':
      case 'concerning':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Info className="h-5 w-5 text-blue-500" />;
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle>Health Assessment</CardTitle>
            <div className="flex items-center gap-2">
              {getStatusIcon(data.overall_status)}
              <Badge variant="outline" className="text-sm font-medium">
                Overall: {data.overall_status}
              </Badge>
            </div>
          </div>
          <CardDescription>{data.general_assessment}</CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* BMI Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">BMI Assessment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">BMI Value: {data.bmi.value.toFixed(1)}</span>
                <Badge className={getBmiColor(data.bmi.category)}>
                  {data.bmi.category}
                </Badge>
              </div>
              <Progress 
                value={Math.min(Math.max(data.bmi.value / 40 * 100, 0), 100)} 
                className="h-2" 
              />
              <p className="text-sm text-muted-foreground">{data.bmi.interpretation}</p>
            </div>
          </CardContent>
        </Card>

        {/* Health Risks Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Health Risks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.health_risks.length > 0 ? (
                data.health_risks.map((risk, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{risk.risk}</span>
                      <Badge className={getSeverityColor(risk.severity)}>
                        {risk.severity} Risk
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{risk.description}</p>
                    {index < data.health_risks.length - 1 && <Separator className="my-2" />}
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No significant health risks identified.</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.recommendations.map((rec, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{rec.category}</span>
                  <Badge className={getImportanceColor(rec.importance)}>
                    {rec.importance}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{rec.suggestion}</p>
                {index < data.recommendations.length - 1 && <Separator className="my-2" />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Lifestyle Changes */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Suggested Lifestyle Changes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.lifestyle_changes.map((change, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{change.area}</span>
                  <span className="text-xs text-muted-foreground">Timeframe: {change.timeframe}</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div className="bg-muted p-2 rounded-md">
                    <p className="text-xs text-muted-foreground">Current</p>
                    <p className="text-sm">{change.current_status}</p>
                  </div>
                  <div className="bg-muted p-2 rounded-md">
                    <p className="text-xs text-muted-foreground">Target</p>
                    <p className="text-sm">{change.target}</p>
                  </div>
                </div>
                {index < data.lifestyle_changes.length - 1 && <Separator className="my-2" />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
