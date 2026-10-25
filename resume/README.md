# Updating the CV

`resume/index.html` is the source for both the online CV and the application PDF.
The website keeps the portfolio's visual design. The download is a single-column,
text-based PDF with the core skills, experience, projects, education and contacts.
Additional background sections remain available on the website.

Install the export dependencies in a virtual environment:

```sh
python3 -m venv .venv
.venv/bin/python -m pip install -r scripts/requirements-pdf.txt
PYTHON=.venv/bin/python bash scripts/export-pdf.sh
```

Run from the repository root. The generated file replaces
`assets/Aleksandar-Dimitrov-CV.pdf`, which all download buttons already reference.
The export verifies one page, contact text, employment dates and essential fields.
Render and inspect the resulting PDF after content changes before publishing.

Do not treat personal projects as client work or add unverified performance metrics.
Availability is 15–30 hours/week for remote freelance or part-time projects.
