import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent } from '@/components/ui/card';
import { checkHealth, HealthCheckInput, HealthCheckResponse } from '@/app/integration/integration-core';

interface HealthCheckFieldsProps {
  onSubmitSuccess: (data: HealthCheckResponse) => void;
}

export default function HealthCheckFields({ onSubmitSuccess }: HealthCheckFieldsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<HealthCheckInput>({
    age: 35,
    height: 175,
    weight: 70,
    gender: "Male",
    activity_level: "Moderate",
    medical_conditions: "Mild hypertension",
    medications: "Lisinopril 10mg daily",
    diet: "Mixed diet with moderate carbs and protein",
    sleep: 7,
    stress: 6,
    exercise: "30 minutes walking 3 times per week",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'age' || name === 'height' || name === 'weight' || name === 'sleep' || name === 'stress' 
        ? Number(value) 
        : value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSliderChange = (value: number[]) => {
    setFormData(prev => ({
      ...prev,
      stress: value[0]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await checkHealth(formData);
      onSubmitSuccess(response);
    } catch (error) {
      console.error("Error submitting health check:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Age Field */}
            <div className="space-y-2">
              <Label htmlFor="age">Age (years)</Label>
              <Input 
                id="age"
                name="age"
                type="number"
                placeholder="35"
                value={formData.age}
                onChange={handleInputChange}
                min={1}
                max={120}
              />
            </div>

            {/* Height Field */}
            <div className="space-y-2">
              <Label htmlFor="height">Height (cm)</Label>
              <Input 
                id="height"
                name="height"
                type="number"
                placeholder="175"
                value={formData.height}
                onChange={handleInputChange}
                min={50}
                max={250}
              />
            </div>

            {/* Weight Field */}
            <div className="space-y-2">
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input 
                id="weight"
                name="weight"
                type="number"
                placeholder="70"
                value={formData.weight}
                onChange={handleInputChange}
                min={20}
                max={300}
              />
            </div>

            {/* Gender Field */}
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select 
                value={formData.gender} 
                onValueChange={(value) => handleSelectChange('gender', value)}
              >
                <SelectTrigger id="gender">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Non-binary">Non-binary</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Activity Level Field */}
            <div className="space-y-2">
              <Label htmlFor="activity_level">Activity Level</Label>
              <Select 
                value={formData.activity_level} 
                onValueChange={(value) => handleSelectChange('activity_level', value)}
              >
                <SelectTrigger id="activity_level">
                  <SelectValue placeholder="Select activity level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Sedentary">Sedentary</SelectItem>
                  <SelectItem value="Light">Light</SelectItem>
                  <SelectItem value="Moderate">Moderate</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Very Active">Very Active</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Sleep Field */}
            <div className="space-y-2">
              <Label htmlFor="sleep">Sleep (hours/day)</Label>
              <Input 
                id="sleep"
                name="sleep"
                type="number"
                placeholder="7"
                step="0.5"
                value={formData.sleep}
                onChange={handleInputChange}
                min={0}
                max={24}
              />
            </div>

            {/* Stress Level Field */}
            <div className="space-y-2">
              <Label htmlFor="stress">Stress Level (1-10)</Label>
              <div className="pt-2">
                <Slider
                  id="stress"
                  value={[formData.stress]}
                  min={1}
                  max={10}
                  step={1}
                  onValueChange={handleSliderChange}
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>1</span>
                  <span>5</span>
                  <span>10</span>
                </div>
              </div>
            </div>
          </div>

          {/* Medical Conditions Field */}
          <div className="space-y-2">
            <Label htmlFor="medical_conditions">Medical Conditions</Label>
            <Textarea 
              id="medical_conditions"
              name="medical_conditions"
              placeholder="Any existing medical conditions"
              value={formData.medical_conditions}
              onChange={handleInputChange}
            />
            <p className="text-sm text-muted-foreground">List any diagnosed medical conditions</p>
          </div>

          {/* Medications Field */}
          <div className="space-y-2">
            <Label htmlFor="medications">Medications</Label>
            <Textarea 
              id="medications"
              name="medications"
              placeholder="Current medications"
              value={formData.medications}
              onChange={handleInputChange}
            />
            <p className="text-sm text-muted-foreground">List any medications you&apos;re currently taking</p>
          </div>

          {/* Diet Field */}
          <div className="space-y-2">
            <Label htmlFor="diet">Diet</Label>
            <Textarea 
              id="diet"
              name="diet"
              placeholder="Description of typical diet"
              value={formData.diet}
              onChange={handleInputChange}
            />
            <p className="text-sm text-muted-foreground">Describe your typical eating habits</p>
          </div>

          {/* Exercise Field */}
          <div className="space-y-2">
            <Label htmlFor="exercise">Exercise Routine</Label>
            <Textarea 
              id="exercise"
              name="exercise"
              placeholder="Description of exercise routine"
              value={formData.exercise}
              onChange={handleInputChange}
            />
            <p className="text-sm text-muted-foreground">Describe your typical exercise routine</p>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Processing..." : "Submit Health Check"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
