"""
ReportLab PDF Report Generator for CyberSecure AI.
Generates enterprise-grade downloadable security reports with logo, executive summary, threat analysis, risk levels, and MITRE/OWASP mappings.
"""

import os
from datetime import datetime
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from utils.logger import logger

def generate_pdf_report(
    title: str,
    query: str,
    exec_summary: str,
    threat_analysis: str,
    risk_level: str,
    business_impact: str,
    mitigation: str,
    recommendations: str,
    confidence_score: int,
    owasp_mapping: str = "N/A",
    mitre_mapping: str = "N/A",
    references: List[str] = None,
    output_path: str = None
) -> str:
    """Generate professional Cyber Security PDF report and save to output_path."""
    if references is None:
        references = []
    
    if not output_path:
        reports_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), "reports")
        os.makedirs(reports_dir, exist_ok=True)
        filename = f"CyberSecure_Report_{datetime.now().strftime('%Y%m%d_%H%M%S')}.pdf"
        output_path = os.path.join(reports_dir, filename)

    doc = SimpleDocTemplate(
        output_path,
        pagesize=letter,
        rightMargin=36,
        leftMargin=36,
        topMargin=36,
        bottomMargin=36
    )

    styles = getSampleStyleSheet()
    
    # Custom Palette
    dark_primary = colors.HexColor("#0F172A")
    brand_blue = colors.HexColor("#0284C7")
    risk_colors = {
        "CRITICAL": colors.HexColor("#DC2626"),
        "HIGH": colors.HexColor("#EA580C"),
        "MEDIUM": colors.HexColor("#D97706"),
        "LOW": colors.HexColor("#059669"),
        "INFORMATIONAL": colors.HexColor("#2563EB")
    }
    badge_color = risk_colors.get(risk_level.upper(), colors.HexColor("#475569"))

    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Heading1'],
        fontSize=22,
        leading=26,
        textColor=dark_primary,
        fontName='Helvetica-Bold',
        spaceAfter=6
    )

    subtitle_style = ParagraphStyle(
        'SubTitle',
        parent=styles['Normal'],
        fontSize=10,
        textColor=colors.HexColor("#64748B"),
        fontName='Helvetica',
        spaceAfter=15
    )

    h2_style = ParagraphStyle(
        'Heading2',
        parent=styles['Heading2'],
        fontSize=13,
        leading=16,
        textColor=brand_blue,
        fontName='Helvetica-Bold',
        spaceBefore=12,
        spaceAfter=6
    )

    body_style = ParagraphStyle(
        'BodyText',
        parent=styles['Normal'],
        fontSize=9.5,
        leading=14,
        textColor=colors.HexColor("#334155"),
        fontName='Helvetica'
    )

    story = []

    # Header Banner
    story.append(Paragraph("🛡️ CYBERSECURE AI - EXECUTIVE SECURITY REPORT", title_style))
    story.append(Paragraph(f"Generated on {datetime.now().strftime('%B %d, %Y at %H:%M UTC')} • Enterprise SOC Assistant", subtitle_style))
    story.append(HRFlowable(width="100%", thickness=1.5, color=brand_blue, spaceBefore=0, spaceAfter=15))

    # Meta Table (Risk Badge, Confidence, Scope)
    meta_data = [
        [
            Paragraph("<b>Target Assessment / Query:</b>", body_style),
            Paragraph(query, body_style)
        ],
        [
            Paragraph("<b>Assessed Risk Level:</b>", body_style),
            Paragraph(f"<font color='{badge_color.hexval()}'><b>{risk_level.upper()}</b></font>", body_style)
        ],
        [
            Paragraph("<b>AI Confidence Score:</b>", body_style),
            Paragraph(f"<b>{confidence_score}%</b> (Grounded Multi-Agent Verification)", body_style)
        ],
        [
            Paragraph("<b>Framework Mappings:</b>", body_style),
            Paragraph(f"OWASP: {owasp_mapping} | MITRE ATT&CK: {mitre_mapping}", body_style)
        ]
    ]

    t_meta = Table(meta_data, colWidths=[150, 390])
    t_meta.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#F8FAFC")),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor("#E2E8F0")),
        ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor("#CBD5E1")),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('TOPPADDING', (0,0), (-1,-1), 6),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
        ('RIGHTPADDING', (0,0), (-1,-1), 8),
    ]))
    story.append(t_meta)
    story.append(Spacer(1, 15))

    # Executive Summary
    story.append(Paragraph("1. Executive Summary", h2_style))
    story.append(Paragraph(exec_summary, body_style))
    story.append(Spacer(1, 10))

    # Threat Analysis
    story.append(Paragraph("2. Technical Threat Analysis", h2_style))
    story.append(Paragraph(threat_analysis, body_style))
    story.append(Spacer(1, 10))

    # Business Impact
    story.append(Paragraph("3. Business & Operational Impact", h2_style))
    story.append(Paragraph(business_impact, body_style))
    story.append(Spacer(1, 10))

    # Mitigation
    story.append(Paragraph("4. Immediate Containment & Mitigation", h2_style))
    story.append(Paragraph(mitigation, body_style))
    story.append(Spacer(1, 10))

    # Recommendations
    story.append(Paragraph("5. Long-term Recommendations", h2_style))
    story.append(Paragraph(recommendations, body_style))
    story.append(Spacer(1, 10))

    # References
    if references:
        story.append(Paragraph("6. References & Source Documents", h2_style))
        ref_text = "<br/>".join([f"• {ref}" for ref in references])
        story.append(Paragraph(ref_text, body_style))

    try:
        doc.build(story)
        logger.info(f"Successfully generated PDF report at {output_path}")
        return output_path
    except Exception as e:
        logger.error(f"Failed to generate PDF report: {e}")
        return ""
