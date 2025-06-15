
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Plus, X } from "lucide-react";
import jsPDF from 'jspdf';

interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
}

interface PrescriptionData {
  patientName: string;
  patientAge: string;
  diagnosis: string;
  medications: Medication[];
  advice: string;
  followUp: string;
}

export const PrescriptionGenerator = () => {
  const [prescription, setPrescription] = useState<PrescriptionData>({
    patientName: '',
    patientAge: '',
    diagnosis: '',
    medications: [],
    advice: '',
    followUp: ''
  });

  const addMedication = () => {
    const newMedication: Medication = {
      id: Date.now().toString(),
      name: '',
      dosage: '',
      frequency: '',
      duration: ''
    };
    setPrescription(prev => ({
      ...prev,
      medications: [...prev.medications, newMedication]
    }));
  };

  const removeMedication = (id: string) => {
    setPrescription(prev => ({
      ...prev,
      medications: prev.medications.filter(med => med.id !== id)
    }));
  };

  const updateMedication = (id: string, field: keyof Medication, value: string) => {
    setPrescription(prev => ({
      ...prev,
      medications: prev.medications.map(med => 
        med.id === id ? { ...med, [field]: value } : med
      )
    }));
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    
    // Header
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text('MEDICAL PRESCRIPTION', pageWidth / 2, 30, { align: 'center' });
    
    // Doctor info (placeholder)
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text('Dr. Sarah Johnson', 20, 50);
    doc.text('Cardiologist', 20, 60);
    doc.text('License: MED123456', 20, 70);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, pageWidth - 60, 50);
    
    // Patient info
    doc.setFont('helvetica', 'bold');
    doc.text('Patient Information:', 20, 90);
    doc.setFont('helvetica', 'normal');
    doc.text(`Name: ${prescription.patientName}`, 20, 105);
    doc.text(`Age: ${prescription.patientAge}`, 20, 115);
    doc.text(`Diagnosis: ${prescription.diagnosis}`, 20, 125);
    
    // Medications
    let yPosition = 145;
    if (prescription.medications.length > 0) {
      doc.setFont('helvetica', 'bold');
      doc.text('Medications:', 20, yPosition);
      yPosition += 15;
      
      prescription.medications.forEach((med, index) => {
        doc.setFont('helvetica', 'normal');
        doc.text(`${index + 1}. ${med.name}`, 25, yPosition);
        doc.text(`   Dosage: ${med.dosage}`, 25, yPosition + 10);
        doc.text(`   Frequency: ${med.frequency}`, 25, yPosition + 20);
        doc.text(`   Duration: ${med.duration}`, 25, yPosition + 30);
        yPosition += 45;
      });
    }
    
    // Advice
    if (prescription.advice) {
      doc.setFont('helvetica', 'bold');
      doc.text('Advice:', 20, yPosition);
      doc.setFont('helvetica', 'normal');
      const adviceLines = doc.splitTextToSize(prescription.advice, pageWidth - 40);
      doc.text(adviceLines, 20, yPosition + 15);
      yPosition += adviceLines.length * 6 + 20;
    }
    
    // Follow up
    if (prescription.followUp) {
      doc.setFont('helvetica', 'bold');
      doc.text('Follow-up:', 20, yPosition);
      doc.setFont('helvetica', 'normal');
      doc.text(prescription.followUp, 20, yPosition + 15);
    }
    
    // Footer
    doc.setFontSize(10);
    doc.text('This is a computer-generated prescription.', pageWidth / 2, doc.internal.pageSize.height - 20, { align: 'center' });
    
    // Save PDF
    const fileName = `prescription_${prescription.patientName.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;
    doc.save(fileName);
  };

  return (
    <Card className="dark:bg-gray-800 dark:border-gray-700">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 dark:text-white">
          <FileText className="w-5 h-5" />
          Generate Prescription
        </CardTitle>
        <CardDescription className="dark:text-gray-300">
          Create and download prescription PDFs for your patients
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Patient Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="patientName" className="dark:text-gray-200">Patient Name</Label>
            <Input
              id="patientName"
              value={prescription.patientName}
              onChange={(e) => setPrescription(prev => ({ ...prev, patientName: e.target.value }))}
              className="dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            />
          </div>
          <div>
            <Label htmlFor="patientAge" className="dark:text-gray-200">Patient Age</Label>
            <Input
              id="patientAge"
              value={prescription.patientAge}
              onChange={(e) => setPrescription(prev => ({ ...prev, patientAge: e.target.value }))}
              className="dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="diagnosis" className="dark:text-gray-200">Diagnosis</Label>
          <Input
            id="diagnosis"
            value={prescription.diagnosis}
            onChange={(e) => setPrescription(prev => ({ ...prev, diagnosis: e.target.value }))}
            className="dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all duration-200"
          />
        </div>

        {/* Medications */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <Label className="dark:text-gray-200">Medications</Label>
            <Button
              onClick={addMedication}
              variant="outline"
              size="sm"
              className="hover:scale-105 transition-transform duration-200 dark:border-gray-600 dark:hover:bg-gray-700"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Medication
            </Button>
          </div>
          
          <div className="space-y-4">
            {prescription.medications.map((medication) => (
              <div key={medication.id} className="border rounded-lg p-4 dark:border-gray-600 animate-in slide-in-from-left-1 fade-in-0">
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="secondary" className="dark:bg-gray-700 dark:text-gray-200">
                    Medication {prescription.medications.indexOf(medication) + 1}
                  </Badge>
                  <Button
                    onClick={() => removeMedication(medication.id)}
                    variant="ghost"
                    size="sm"
                    className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Input
                    placeholder="Medicine name"
                    value={medication.name}
                    onChange={(e) => updateMedication(medication.id, 'name', e.target.value)}
                    className="dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                  />
                  <Input
                    placeholder="Dosage (e.g., 500mg)"
                    value={medication.dosage}
                    onChange={(e) => updateMedication(medication.id, 'dosage', e.target.value)}
                    className="dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                  />
                  <Input
                    placeholder="Frequency (e.g., Twice daily)"
                    value={medication.frequency}
                    onChange={(e) => updateMedication(medication.id, 'frequency', e.target.value)}
                    className="dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                  />
                  <Input
                    placeholder="Duration (e.g., 7 days)"
                    value={medication.duration}
                    onChange={(e) => updateMedication(medication.id, 'duration', e.target.value)}
                    className="dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Advice */}
        <div>
          <Label htmlFor="advice" className="dark:text-gray-200">Medical Advice</Label>
          <Textarea
            id="advice"
            placeholder="Enter medical advice and instructions..."
            value={prescription.advice}
            onChange={(e) => setPrescription(prev => ({ ...prev, advice: e.target.value }))}
            className="dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            rows={4}
          />
        </div>

        {/* Follow Up */}
        <div>
          <Label htmlFor="followUp" className="dark:text-gray-200">Follow-up Instructions</Label>
          <Input
            id="followUp"
            placeholder="e.g., Follow up in 1 week"
            value={prescription.followUp}
            onChange={(e) => setPrescription(prev => ({ ...prev, followUp: e.target.value }))}
            className="dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all duration-200"
          />
        </div>

        {/* Generate Button */}
        <Button
          onClick={generatePDF}
          className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-200 hover:scale-[1.02] transform"
          disabled={!prescription.patientName || !prescription.diagnosis}
        >
          <Download className="w-4 h-4 mr-2" />
          Generate & Download PDF
        </Button>
      </CardContent>
    </Card>
  );
};
