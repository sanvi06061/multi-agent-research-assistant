from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet


def pdf_agent(content):

    doc = SimpleDocTemplate("reports/report.pdf")
    styles = getSampleStyleSheet()

    story = []

    story.append(
        Paragraph(content, styles['BodyText'])
    )

    story.append(
        Spacer(1, 12)
    )

    doc.build(story)

    return "reports/report.pdf"