#!/usr/bin/env python3
"""Export the online CV's HTML content to a text-first, one-page PDF.

Requires reportlab and pypdf. No browser, network or system fonts required.
"""
from html import escape
from html.parser import HTMLParser
from pathlib import Path
import re
from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, KeepTogether
from pypdf import PdfReader

ROOT = Path(__file__).resolve().parent.parent

class Node:
    def __init__(self, tag='', attrs=()):
        self.tag, self.attrs, self.children = tag, dict(attrs), []
    def text(self):
        return re.sub(r'\s+', ' ', ' '.join(c.text() if isinstance(c, Node) else c for c in self.children)).strip()
    def all(self, tag=None, cls=None):
        found = []
        for c in self.children:
            if isinstance(c, Node):
                if (tag is None or c.tag == tag) and (cls is None or cls in c.attrs.get('class', '').split()):
                    found.append(c)
                found.extend(c.all(tag, cls))
        return found
    def one(self, tag=None, cls=None):
        nodes = self.all(tag, cls)
        if not nodes:
            raise ValueError(f'Missing CV element: {tag}, {cls}')
        return nodes[0]

class Document(HTMLParser):
    VOID = {'area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr'}
    def __init__(self, source):
        super().__init__(convert_charrefs=True)
        self.root = Node()
        self.stack = [self.root]
        self.feed(source)
    def handle_starttag(self, tag, attrs):
        n = Node(tag, attrs)
        self.stack[-1].children.append(n)
        if tag not in self.VOID:
            self.stack.append(n)
    def handle_endtag(self, tag):
        for i in range(len(self.stack)-1, 0, -1):
            if self.stack[i].tag == tag:
                self.stack = self.stack[:i]
                break
    def handle_data(self, data):
        self.stack[-1].children.append(data)

def clean(text):
    return escape(text.replace('–','-').replace('—','-').replace('×','x').replace('→','').strip())

def line_breaks(node):
    return ''.join('<br/>' if isinstance(c,Node) and c.tag=='br' else clean(c.text() if isinstance(c,Node) else c) for c in node.children)

def main():
    cv = Document((ROOT/'resume/index.html').read_text()).root.one('article','resume-doc')
    sections = {s.one('h2').text():s for s in cv.all('section','resume-panel')}
    ink, green = HexColor('#18241d'), HexColor('#355920')
    styles = {
        'name': ParagraphStyle('name',fontName='Helvetica-Bold',fontSize=22,leading=26,spaceAfter=3,textColor=ink),
        'role': ParagraphStyle('role',fontName='Helvetica',fontSize=11.2,leading=15,spaceAfter=5,textColor=green),
        'body': ParagraphStyle('body',fontName='Helvetica',fontSize=9,leading=12,spaceAfter=4,textColor=ink),
        'small': ParagraphStyle('small',fontName='Helvetica',fontSize=8.3,leading=11,spaceAfter=3,textColor=ink),
        'section': ParagraphStyle('section',fontName='Helvetica-Bold',fontSize=10,leading=13,spaceBefore=7,spaceAfter=4,textColor=green),
    }
    story = []
    def p(text, style='body'): return Paragraph(text,styles[style])
    def add(text, style='body'): story.append(p(text,style))
    def heading(title): add(title.upper(),'section')
    def link(url): return f'<link href="{escape(url,quote=True)}" color="#355920">{clean(url.removeprefix("https://"))}</link>'
    add(clean(cv.one('h1').text()),'name')
    add(clean(cv.one('p','resume-role').text()),'role')
    contacts = sections['Contact']
    email = next(a.attrs['href'][7:] for a in contacts.all('a') if a.attrs.get('href','').startswith('mailto:'))
    add(f'{clean(contacts.one("span","resume-contact-value").text())} | {clean(email)} | Remote: 15-30 hours/week')
    for label in ['Portfolio','GitHub','LinkedIn']:
        li = next(li for li in contacts.all('li') if li.one('span').text()==label)
        add(f'{label}: {link(li.one("a").attrs["href"])}','small')
    heading('Profile')
    add(clean(sections['Profile'].one('p').text()))
    heading('Technical skills')
    for item in sections['Technical skills'].all('p'):
        label, value = item.text().split(':',1)
        add(f'<b>{clean(label)}:</b> {clean(value)}')
    heading('Experience')
    for entry in sections['Experience'].all('article','resume-entry'):
        if 'resume-earlier' in entry.attrs.get('class',''):
            continue
        items = [p(f'<b>{clean(entry.one("h3").text())}</b><br/>{clean(entry.one("time").text())}')]
        items.extend(p('- '+clean(li.text())) for li in entry.all('li'))
        story.append(KeepTogether(items))
    heading('Selected independent projects')
    for project in sections['Selected products'].one('div','resume-product-grid').all('article'):
        title = project.one('h3').text()
        status = 'Early access' if title=='PackTune' else ('Private project' if title=='NestSyncFlow' else 'Live product')
        description = ' '.join(n.text() for n in project.all('p') if 'resume-meta' not in n.attrs.get('class',''))
        url = project.all('a')[-1].attrs['href']
        story.append(KeepTogether([p(f'<b>{clean(title)}</b> | {status}'),
            p(clean(project.one('p','resume-meta').text())+'<br/>'+clean(description)), p(link(url),'small')]))
    heading('Education and languages')
    add(line_breaks(sections['Education'].one('p')))
    add(' | '.join(f'{clean(li.one("strong").text())}: {clean(li.one("span").text())}' for li in sections['Languages'].all('li')))
    output = ROOT/'assets/Aleksandar-Dimitrov-CV.pdf'
    SimpleDocTemplate(str(output),pagesize=A4,leftMargin=36,rightMargin=36,topMargin=28,bottomMargin=28,
        title='Aleksandar Dimitrov - Frontend and Full-Stack Web Developer',author='Aleksandar Dimitrov').build(story)
    reader = PdfReader(output)
    text = '\n'.join(page.extract_text() for page in reader.pages)
    for expected in [email,'15-30','March 2025','August 2025','PackTune','ULSIT','Node.js','TypeScript']:
        if expected not in text: raise ValueError(f'PDF text check failed: {expected}')
    if len(reader.pages)!=1: raise ValueError(f'Expected one readable page, got {len(reader.pages)}')
    print(f'PDF written: {output} (1 page; dates, contact details and text verified)')

if __name__=='__main__': main()
