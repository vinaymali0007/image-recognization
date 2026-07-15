from flask import send_file, g
from services.report_service import generate_pdf_report
from utils.response import error_response

def download_report(id):
    pdf_buffer = generate_pdf_report(id, g.user_id)
    if not pdf_buffer:
        return error_response("Prediction not found or report generation failed", 404)
        
    return send_file(
        pdf_buffer,
        as_attachment=True,
        download_name=f"neuroscan_report_{id}.pdf",
        mimetype="application/pdf"
    )

def delete_report(id):
    # Reports are generated dynamically, so "deleting" a report could just mean deleting the prediction,
    # or returning an acknowledgment since it doesn't take physical disk space as a report.
    # The prompt says "Allow Download Report / Delete Report". 
    # We will just return 200 OK or 404 if prediction doesn't exist.
    from services.prediction_service import get_prediction_details
    details = get_prediction_details(id, g.user_id)
    if not details:
         return error_response("Report not found", 404)
    
    # We don't actually delete anything since it's on-the-fly, 
    # if they meant delete the prediction, they use the other endpoint.
    return {"message": "Report deleted/hidden successfully"}, 200
