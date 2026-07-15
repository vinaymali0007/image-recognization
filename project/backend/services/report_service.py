import io
import os
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter
from reportlab.lib.units import inch
from services.prediction_service import get_prediction_details
from models.user import User

def generate_pdf_report(prediction_id: str, user_id: str) -> io.BytesIO:
    details = get_prediction_details(prediction_id, user_id)
    if not details:
        return None
        
    user = User.query.get(user_id)
    
    buffer = io.BytesIO()
    p = canvas.Canvas(buffer, pagesize=letter)
    width, height = letter
    
    # Title
    p.setFont("Helvetica-Bold", 24)
    p.drawString(1 * inch, height - 1 * inch, "NeuroScan Prediction Report")
    
    p.setFont("Helvetica", 12)
    p.drawString(1 * inch, height - 1.5 * inch, f"Patient / User: {user.name}")
    p.drawString(1 * inch, height - 1.75 * inch, f"Date: {details['created_at']}")
    p.drawString(1 * inch, height - 2.0 * inch, f"Model Version: {details['model_version']}")
    
    # Results
    p.setFont("Helvetica-Bold", 14)
    p.drawString(1 * inch, height - 2.5 * inch, "Prediction Results")
    
    p.setFont("Helvetica", 12)
    p.drawString(1 * inch, height - 2.75 * inch, f"Diagnosis: {details['prediction']}")
    p.drawString(1 * inch, height - 3.0 * inch, f"Confidence: {details['confidence']:.2f}%")
    
    if 'probabilities' in details:
        p.drawString(1 * inch, height - 3.25 * inch, "Class Probabilities:")
        y_pos = height - 3.5 * inch
        for class_name, prob in details['probabilities'].items():
            p.drawString(1.2 * inch, y_pos, f"- {class_name}: {prob:.2f}%")
            y_pos -= 0.25 * inch
    else:
        y_pos = height - 3.25 * inch
        
    # Try adding image thumbnail if exists
    if 'image_path' in details and os.path.exists(details['image_path']):
        try:
            # We scale the image to a reasonable size
            p.drawImage(details['image_path'], 1 * inch, y_pos - 3 * inch, width=3*inch, preserveAspectRatio=True)
        except Exception as e:
            pass # ignore image draw errors
            
    p.showPage()
    p.save()
    
    buffer.seek(0)
    return buffer
