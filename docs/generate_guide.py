#!/usr/bin/env python3
"""
Chekin UI Kit -- Frontend Handbook PDF generator.

Generates a branded multi-page PDF documenting the @chekin/ui package.
Style mirrors the "Sales Research Agent" example PDF but uses Chekin's
Main Blue (#385BF8) as the accent instead of purple.

Regenerate with:
    python3 generate_guide.py

Output: chekin-ui-kit-guide.pdf in the same directory as this script.
"""

import os
from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import (
    BaseDocTemplate,
    Flowable,
    Frame,
    PageBreak,
    PageTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
)

# ---------------------------------------------------------------- Colors ---
NAVY = HexColor('#161643')            # product navy (text, cover bg)
DARK = HexColor('#19194B')            # marketing navy
BLUE = HexColor('#385BF8')            # the accent
BLUE_HOVER = HexColor('#5975F5')
BLUE_GRAD_START = HexColor('#002CFA')
BLUE_GRAD_END = HexColor('#274BF0')
RED = HexColor('#FF2467')
GREEN = HexColor('#0F9F80')
AMBER = HexColor('#B86A00')

BLUE_BG = HexColor('#EFF6FF')
PRESSED_BLUE = HexColor('#F0F3FF')
INPUT_EMPTY = HexColor('#F4F6F8')
MINT_BG = HexColor('#E8FCF7')
AMBER_BG = HexColor('#FFF4E5')
LAVENDER = HexColor('#F4F4FD')

GRAY_1 = HexColor('#6B6B95')
GRAY_2 = HexColor('#9696B9')
GRAY_3 = HexColor('#DEDEEB')
WHITE = HexColor('#FFFFFF')

CODE_BG = HexColor('#0F0F2E')
CODE_COMMENT = HexColor('#868CA8')
CODE_STRING = HexColor('#A8C0FF')
CODE_KEYWORD = HexColor('#B5A8FF')
CODE_LABEL = HexColor('#9EB2FF')

# ----------------------------------------------------------------- Fonts ---
F_REG = 'Helvetica'
F_BOLD = 'Helvetica-Bold'
F_OBLIQUE = 'Helvetica-Oblique'
F_MONO = 'Courier'
F_MONO_BOLD = 'Courier-Bold'

# ---------------------------------------------------------------- Layout ---
PAGE_W, PAGE_H = A4
MARGIN = 54
FOOTER_Y = 36
CONTENT_W = PAGE_W - 2 * MARGIN

GUIDE_NAME = 'Chekin UI Kit  -  Frontend Handbook v0.2'
TOTAL_SECTIONS = 11

# ---------------------------------------------------------- Text helpers ---
# Helvetica's built-in WinAnsi encoding does NOT include some common glyphs
# (arrows, emojis, check marks, math symbols). Replace them with ASCII.
_UNICODE_FALLBACK = {
    '\u2192': '->',       # right arrow
    '\u2190': '<-',
    '\u2194': '<->',
    '\u21d2': '=>',
    '\u2713': 'v',        # check
    '\u2717': 'x',
    '\u2022': '-',        # bullet
    '\u2264': '<=',
    '\u2265': '>=',
    '\u2261': '=',
    # Emojis -> ASCII caps letter markers (we draw badges instead)
}

def clean(s):
    if s is None:
        return ''
    for k, v in _UNICODE_FALLBACK.items():
        s = s.replace(k, v)
    return s

# Rich-text escape for Paragraph (leave our own <b>, <i>, <font ...> tags intact).
def escape(s):
    s = clean(s)
    return (
        s.replace('&', '&amp;')
        .replace('<', '&lt;')
        .replace('>', '&gt;')
    )

# ---------------------------------------------------- Paragraph styles ---
P_BODY = ParagraphStyle(
    'body', fontName=F_REG, fontSize=10.5, leading=16,
    textColor=NAVY, spaceAfter=8,
)
P_BODY_GRAY = ParagraphStyle(
    'body_gray', parent=P_BODY, textColor=GRAY_1,
)
P_BODY_SMALL = ParagraphStyle(
    'body_small', fontName=F_REG, fontSize=9, leading=13,
    textColor=GRAY_1,
)
P_LEAD = ParagraphStyle(
    'lead', fontName=F_REG, fontSize=11.5, leading=18,
    textColor=NAVY, spaceAfter=10,
)
P_H2 = ParagraphStyle(
    'h2', fontName=F_BOLD, fontSize=20, leading=26,
    textColor=NAVY, spaceAfter=4,
)
P_H3 = ParagraphStyle(
    'h3', fontName=F_BOLD, fontSize=13, leading=18,
    textColor=NAVY, spaceBefore=14, spaceAfter=6,
)
P_SUB = ParagraphStyle(
    'sub', fontName=F_REG, fontSize=11, leading=15,
    textColor=GRAY_1, spaceAfter=8,
)
P_CAPTION = ParagraphStyle(
    'caption', fontName=F_BOLD, fontSize=8.5, leading=11,
    textColor=BLUE, spaceAfter=4,
)
P_LABEL_MONO = ParagraphStyle(
    'label_mono', fontName=F_MONO_BOLD, fontSize=8, leading=10,
    textColor=CODE_LABEL, spaceAfter=6,
)
P_CODE = ParagraphStyle(
    'code', fontName=F_MONO, fontSize=9.5, leading=14,
    textColor=WHITE, leftIndent=0, rightIndent=0,
)
P_FEAT_TITLE = ParagraphStyle(
    'feat_title', fontName=F_BOLD, fontSize=11.5, leading=14,
    textColor=NAVY, spaceAfter=4,
)
P_FEAT_BODY = ParagraphStyle(
    'feat_body', fontName=F_REG, fontSize=9.5, leading=13,
    textColor=GRAY_1,
)
P_CALLOUT_LEAD = ParagraphStyle(
    'callout_lead', fontName=F_REG, fontSize=10, leading=14,
    textColor=NAVY,
)
P_TABLE_H = ParagraphStyle(
    'table_h', fontName=F_BOLD, fontSize=9.5, leading=12,
    textColor=WHITE,
)
P_TABLE_CELL = ParagraphStyle(
    'table_cell', fontName=F_REG, fontSize=9, leading=12.5,
    textColor=NAVY,
)
P_TABLE_CELL_MONO = ParagraphStyle(
    'table_cell_mono', fontName=F_MONO, fontSize=8.5, leading=12,
    textColor=NAVY,
)
P_TABLE_CELL_GRAY = ParagraphStyle(
    'table_cell_gray', parent=P_TABLE_CELL, textColor=GRAY_1,
)

# ---------------------------------------------------------- Cover drawer ---

def draw_cover(canvas, doc):
    c = canvas
    c.saveState()

    # Full-bleed dark navy
    c.setFillColor(NAVY)
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)

    # Subtle accent glow (top-right radial-ish approximation via a few circles)
    c.setFillColor(HexColor('#1F1F5A'))
    for i, (cx, cy, r) in enumerate([(PAGE_W + 60, PAGE_H - 80, 260),
                                     (PAGE_W + 20, PAGE_H - 180, 200),
                                     (PAGE_W - 40, PAGE_H - 40, 140)]):
        c.circle(cx, cy, r, fill=1, stroke=0)

    x = 72
    y = PAGE_H - 270

    # Pill tag
    tag_text = 'INTERNAL USE  -  FRONTEND TEAM'
    c.setFont(F_BOLD, 8.5)
    tw = c.stringWidth(tag_text, F_BOLD, 8.5)
    pill_w, pill_h = tw + 26, 24
    c.setFillColor(HexColor('#2A2A6B'))
    c.setStrokeColor(HexColor('#4949A8'))
    c.setLineWidth(1)
    c.roundRect(x, y + 120, pill_w, pill_h, pill_h / 2, fill=1, stroke=1)
    c.setFillColor(WHITE)
    c.drawString(x + 13, y + 127, tag_text)

    # Title line 1
    c.setFillColor(WHITE)
    c.setFont(F_BOLD, 56)
    c.drawString(x, y + 40, 'Chekin UI Kit')

    # Title line 2 -- in Chekin Main Blue (approximates the purple gradient
    # from the example; reportlab text-on-gradient is not trivial and Main
    # Blue on dark navy reads strongly on-brand).
    c.setFillColor(BLUE)
    c.setFont(F_BOLD, 48)
    c.drawString(x, y - 24, 'Frontend Handbook')

    # Accent underline
    c.setStrokeColor(BLUE)
    c.setLineWidth(4)
    c.line(x, y - 46, x + 120, y - 46)

    # Subtitle
    c.setFillColor(HexColor('#B4B8D5'))
    c.setFont(F_REG, 12)
    subtitle_lines = [
        'The single source of truth for Chekin\'s design tokens, React',
        'components, and visual vocabulary -- shipped as @chekin/ui.',
    ]
    for i, line in enumerate(subtitle_lines):
        c.drawString(x, y - 84 - i * 18, line)

    # Metadata block
    meta = [
        ('Version:', 'v0.2  -  April 2026'),
        ('For:', 'Frontend  -  Backend  -  PM'),
        ('Tool:', 'pnpm monorepo  -  Storybook 8  -  Radix Primitives'),
    ]
    my = 140
    for label, val in meta:
        c.setFont(F_BOLD, 10)
        c.setFillColor(WHITE)
        c.drawString(x, my, label)
        c.setFont(F_REG, 10)
        c.setFillColor(HexColor('#B4B8D5'))
        c.drawString(x + 70, my, val)
        my -= 22

    c.restoreState()


def draw_content_chrome(canvas, doc):
    c = canvas
    c.saveState()
    # Footer
    c.setStrokeColor(GRAY_3)
    c.setLineWidth(0.75)
    c.line(MARGIN, FOOTER_Y + 18, PAGE_W - MARGIN, FOOTER_Y + 18)

    c.setFont(F_REG, 8.5)
    c.setFillColor(GRAY_1)
    c.drawString(MARGIN, FOOTER_Y, GUIDE_NAME)
    section_no = getattr(doc, '_cur_section', 1)
    right = f'Section {section_no} of {TOTAL_SECTIONS}'
    c.drawRightString(PAGE_W - MARGIN, FOOTER_Y, right)
    c.restoreState()


# -------------------------------------------------- Custom flowables ---

class SectionHeader(Flowable):
    """Number badge + title + subtitle + divider.

    Pass ``number=None`` for appendix-style headers (no badge, title
    indented to the left edge).
    """

    def __init__(self, number, title, subtitle):
        super().__init__()
        self.number = number
        self.title = clean(title)
        self.subtitle = clean(subtitle)
        self.width = CONTENT_W
        self.height = 64

    def wrap(self, availw, availh):
        return self.width, self.height

    def draw(self):
        c = self.canv
        b_size = 32
        has_badge = self.number is not None
        title_x = b_size + 14 if has_badge else 0

        if has_badge:
            c.setFillColor(BLUE)
            c.roundRect(0, self.height - b_size - 4, b_size, b_size, 6, fill=1, stroke=0)
            c.setFillColor(WHITE)
            c.setFont(F_BOLD, 16)
            num_str = str(self.number)
            tw = c.stringWidth(num_str, F_BOLD, 16)
            c.drawString((b_size - tw) / 2, self.height - b_size + 7, num_str)

        c.setFillColor(NAVY)
        c.setFont(F_BOLD, 18)
        c.drawString(title_x, self.height - 20, self.title)

        c.setFillColor(GRAY_1)
        c.setFont(F_REG, 10.5)
        c.drawString(title_x, self.height - 38, self.subtitle)

        c.setStrokeColor(GRAY_3)
        c.setLineWidth(0.75)
        c.line(0, 2, self.width, 2)

    def split(self, availw, availh):
        return [self]


class IconBadge(Flowable):
    """Small rounded-square colored badge with letter(s) inside."""

    def __init__(self, letters, bg=BLUE, fg=WHITE, size=34):
        super().__init__()
        self.letters = letters
        self.bg = bg
        self.fg = fg
        self.size = size
        self.width = size
        self.height = size

    def wrap(self, availw, availh):
        return self.size, self.size

    def draw(self):
        c = self.canv
        c.setFillColor(self.bg)
        c.roundRect(0, 0, self.size, self.size, 6, fill=1, stroke=0)
        c.setFillColor(self.fg)
        font_size = 10 if len(self.letters) > 2 else 12
        c.setFont(F_BOLD, font_size)
        tw = c.stringWidth(self.letters, F_BOLD, font_size)
        c.drawString((self.size - tw) / 2, (self.size - font_size) / 2 + 1, self.letters)


def feature_card(letters, icon_bg, title, body):
    """A 2x2 feature card cell: [IconBadge][title + body]."""
    icon = IconBadge(letters, bg=icon_bg, fg=WHITE, size=34)
    inner = Table(
        [[icon]],
        colWidths=[34],
    )
    inner.setStyle(TableStyle([
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('LEFTPADDING', (0, 0), (-1, -1), 0),
        ('RIGHTPADDING', (0, 0), (-1, -1), 0),
        ('TOPPADDING', (0, 0), (-1, -1), 0),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 0),
    ]))
    stack = Table(
        [
            [inner],
            [Spacer(1, 10)],
            [Paragraph(escape(title), P_FEAT_TITLE)],
            [Paragraph(escape(body), P_FEAT_BODY)],
        ],
        colWidths=[CONTENT_W / 2 - 28],
    )
    stack.setStyle(TableStyle([
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('LEFTPADDING', (0, 0), (-1, -1), 0),
        ('RIGHTPADDING', (0, 0), (-1, -1), 0),
        ('TOPPADDING', (0, 0), (-1, -1), 0),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 0),
    ]))
    return stack


def feature_grid(cards):
    """2x2 grid of feature cards (expects 4 cards)."""
    assert len(cards) == 4
    tbl = Table(
        [
            [cards[0], cards[1]],
            [cards[2], cards[3]],
        ],
        colWidths=[CONTENT_W / 2, CONTENT_W / 2],
    )
    tbl.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), WHITE),
        ('BOX', (0, 0), (0, 0), 1, GRAY_3),
        ('BOX', (1, 0), (1, 0), 1, GRAY_3),
        ('BOX', (0, 1), (0, 1), 1, GRAY_3),
        ('BOX', (1, 1), (1, 1), 1, GRAY_3),
        ('ROUNDEDCORNERS', [8, 8, 8, 8]),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('LEFTPADDING', (0, 0), (-1, -1), 18),
        ('RIGHTPADDING', (0, 0), (-1, -1), 18),
        ('TOPPADDING', (0, 0), (-1, -1), 18),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 18),
    ]))
    return tbl


class Callout(Flowable):
    """Colored left-border callout with bold label + body text."""

    def __init__(self, variant, label, body, width=CONTENT_W):
        super().__init__()
        palette = {
            'info': (BLUE_BG, BLUE),
            'warn': (AMBER_BG, AMBER),
            'tip': (MINT_BG, GREEN),
            'note': (LAVENDER, HexColor('#5F5CF0')),
        }
        self.bg, self.border = palette.get(variant, palette['info'])
        self.label = clean(label)
        self.body = clean(body)
        self.width = width
        # Compute height dynamically based on text
        self._para = Paragraph(
            f'<b>{escape(self.label)}</b>  {escape(self.body)}',
            P_CALLOUT_LEAD,
        )
        w, h = self._para.wrap(self.width - 48, 1000)
        self.height = max(h + 20, 44)

    def wrap(self, availw, availh):
        return self.width, self.height

    def draw(self):
        c = self.canv
        c.setFillColor(self.bg)
        c.setStrokeColor(self.bg)
        c.roundRect(0, 0, self.width, self.height, 6, fill=1, stroke=0)
        c.setFillColor(self.border)
        c.rect(0, 0, 4, self.height, fill=1, stroke=0)
        self._para.wrapOn(c, self.width - 48, self.height)
        self._para.drawOn(c, 20, self.height - self._para.height - 10)


class CodeBlock(Flowable):
    """Dark-navy code block with a blue label chip at the top-left."""

    def __init__(self, label, code, width=CONTENT_W):
        super().__init__()
        self.label = label
        self.code = code
        self.width = width
        self._lines = code.split('\n')
        # Rough height: pad top (for label) + pad per line + pad bottom
        self._line_h = 14
        self.height = 24 + 18 + len(self._lines) * self._line_h + 14

    def wrap(self, availw, availh):
        return self.width, self.height

    def draw(self):
        c = self.canv
        c.setFillColor(CODE_BG)
        c.roundRect(0, 0, self.width, self.height, 8, fill=1, stroke=0)
        # Label chip
        c.setFillColor(CODE_LABEL)
        c.setFont(F_MONO_BOLD, 8)
        c.drawString(18, self.height - 24, self.label.upper())

        # Code body
        y = self.height - 44
        for line in self._lines:
            # Very light syntax coloring: comments start with // or #
            stripped = line.lstrip()
            is_comment = stripped.startswith('//') or stripped.startswith('#')
            c.setFillColor(CODE_COMMENT if is_comment else WHITE)
            c.setFont(F_MONO, 9.5)
            c.drawString(18, y, line[:120])
            y -= self._line_h


def color_swatch_row(hex_val, name, description):
    """Row: [swatch][hex][name][description] used in token tables."""
    swatch_table = Table(
        [[' ']], colWidths=[18], rowHeights=[14],
    )
    swatch_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (0, 0), HexColor(hex_val)),
        ('BOX', (0, 0), (0, 0), 0.5, GRAY_3),
        ('LEFTPADDING', (0, 0), (-1, -1), 0),
        ('RIGHTPADDING', (0, 0), (-1, -1), 0),
        ('TOPPADDING', (0, 0), (-1, -1), 0),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 0),
    ]))
    return [
        swatch_table,
        Paragraph(escape(hex_val), P_TABLE_CELL_MONO),
        Paragraph(escape(name), P_TABLE_CELL),
        Paragraph(escape(description), P_TABLE_CELL_GRAY),
    ]


def color_table(rows):
    """Token-table with colored swatches as the first column."""
    header = [
        Paragraph('<b>Swatch</b>', P_TABLE_H),
        Paragraph('<b>Hex</b>', P_TABLE_H),
        Paragraph('<b>Name</b>', P_TABLE_H),
        Paragraph('<b>Used for</b>', P_TABLE_H),
    ]
    data = [header] + rows
    t = Table(
        data,
        colWidths=[36, 74, 140, CONTENT_W - 36 - 74 - 140],
        repeatRows=1,
    )
    t.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), BLUE),
        ('LINEBELOW', (0, 0), (-1, -1), 0.4, GRAY_3),
        ('LEFTPADDING', (0, 0), (-1, -1), 8),
        ('RIGHTPADDING', (0, 0), (-1, -1), 8),
        ('TOPPADDING', (0, 0), (-1, -1), 7),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 7),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
    ]))
    return t


def basic_table(header, rows, col_widths):
    """Simple table with a blue header row and gray borders."""
    header_row = [Paragraph(f'<b>{escape(h)}</b>', P_TABLE_H) for h in header]
    body_rows = [
        [Paragraph(escape(cell), P_TABLE_CELL) for cell in row]
        for row in rows
    ]
    data = [header_row] + body_rows
    t = Table(data, colWidths=col_widths, repeatRows=1)
    t.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), BLUE),
        ('LINEBELOW', (0, 0), (-1, -1), 0.4, GRAY_3),
        ('LEFTPADDING', (0, 0), (-1, -1), 8),
        ('RIGHTPADDING', (0, 0), (-1, -1), 8),
        ('TOPPADDING', (0, 0), (-1, -1), 7),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 7),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
    ]))
    return t


class NumberedStep(Flowable):
    """Numbered circle (blue) + title + body row used for step-by-step lists."""

    def __init__(self, number, title, body, width=CONTENT_W):
        super().__init__()
        self.number = str(number)
        self.title = clean(title)
        self.body = clean(body)
        self.width = width
        self._body_para = Paragraph(escape(self.body), P_BODY)
        self._title_para = Paragraph(f'<b>{escape(self.title)}</b>', P_BODY)
        self._title_para.wrap(width - 36, 1000)
        self._body_para.wrap(width - 36, 1000)
        self.height = self._title_para.height + self._body_para.height + 14

    def wrap(self, availw, availh):
        return self.width, self.height

    def draw(self):
        c = self.canv
        r = 11
        c.setFillColor(BLUE)
        c.circle(r, self.height - r - 2, r, fill=1, stroke=0)
        c.setFillColor(WHITE)
        c.setFont(F_BOLD, 10)
        tw = c.stringWidth(self.number, F_BOLD, 10)
        c.drawString(r - tw / 2, self.height - r - 5, self.number)

        self._title_para.wrapOn(c, self.width - 36, 1000)
        self._title_para.drawOn(c, 28, self.height - self._title_para.height - 2)

        body_y = self.height - self._title_para.height - self._body_para.height - 4
        self._body_para.wrapOn(c, self.width - 36, 1000)
        self._body_para.drawOn(c, 28, body_y)


class Checklist(Flowable):
    """A bullet list with blue checkmark boxes."""

    def __init__(self, items, width=CONTENT_W):
        super().__init__()
        # Do NOT escape: items are expected to contain <b>...</b> markup.
        # Only normalise unicode fallbacks.
        self.items = [clean(i) for i in items]
        self.width = width
        self._paras = [
            Paragraph(i, P_BODY) for i in self.items
        ]
        self._heights = []
        total_h = 0
        for p in self._paras:
            _, h = p.wrap(width - 26, 1000)
            self._heights.append(h)
            total_h += h + 6
        self.height = total_h

    def wrap(self, availw, availh):
        return self.width, self.height

    def draw(self):
        c = self.canv
        y = self.height
        for p, h in zip(self._paras, self._heights):
            box_y = y - h + (h - 10) / 2 - 2
            c.setFillColor(PRESSED_BLUE)
            c.setStrokeColor(BLUE)
            c.setLineWidth(1)
            c.roundRect(0, box_y, 12, 12, 2, fill=1, stroke=1)
            # Check
            c.setStrokeColor(BLUE)
            c.setLineWidth(1.5)
            c.line(3, box_y + 6, 5.5, box_y + 3)
            c.line(5.5, box_y + 3, 9.5, box_y + 9)
            p.wrapOn(c, self.width - 26, 1000)
            p.drawOn(c, 22, y - h)
            y -= h + 6


class DecisionBlock(Flowable):
    """A decision entry: [name | chosen : alternatives considered] on light bg."""

    def __init__(self, name, chosen, alternatives, reason, width=CONTENT_W):
        super().__init__()
        self.name = clean(name)
        self.chosen = clean(chosen)
        self.alternatives = clean(alternatives)
        self.reason = clean(reason)
        self.width = width
        self._content = Paragraph(
            f'<b>Chosen:</b> {escape(self.chosen)}<br/>'
            f'<b>Alternatives considered:</b> <font color="#6B6B95">{escape(self.alternatives)}</font><br/>'
            f'<b>Reason:</b> {escape(self.reason)}',
            P_BODY,
        )
        _, ch = self._content.wrap(width - 40, 1000)
        self._name_h = 18
        self.height = self._name_h + ch + 18

    def wrap(self, availw, availh):
        return self.width, self.height

    def draw(self):
        c = self.canv
        c.setFillColor(INPUT_EMPTY)
        c.setStrokeColor(GRAY_3)
        c.setLineWidth(0.5)
        c.roundRect(0, 0, self.width, self.height, 8, fill=1, stroke=1)
        # Stripe on left
        c.setFillColor(BLUE)
        c.rect(0, 0, 4, self.height, fill=1, stroke=0)
        # Name
        c.setFillColor(NAVY)
        c.setFont(F_BOLD, 11)
        c.drawString(16, self.height - 18, self.name)
        # Content
        self._content.wrapOn(c, self.width - 40, 1000)
        self._content.drawOn(c, 16, 10)


# ------------------------------------------------ Content per section ---

def build_section_1():
    out = []
    out.append(SectionHeader(
        1, 'What this kit is',
        'Chekin\'s shared visual and behavioural vocabulary, packaged.',
    ))
    out.append(Spacer(1, 10))
    out.append(Paragraph(
        'The <b>Chekin UI Kit</b> is a versioned React component library '
        'that replaces per-product visual divergence with a shared, governed '
        'source of truth. Tokens (colors, typography, spacing, shadows) are '
        'published alongside accessible React primitives styled to the '
        'canonical Chekin look. All consumer apps -- Dashboard, backend '
        'admin tools, marketing surfaces -- import the same <font name="Courier">@chekin/ui</font> '
        'package and stay visually consistent by default.',
        P_LEAD,
    ))
    out.append(Spacer(1, 6))
    cards = [
        feature_card('PKG', BLUE, 'Versioned npm package',
                     'Private packages @chekin/ui and @chekin/tokens, '
                     'semver-controlled, consumed via pnpm add.'),
        feature_card('UI', HexColor('#294DF1'), 'Design tokens as code',
                     'Colors, type, spacing, radii, shadows exported as '
                     'CSS variables, JSON, and a Tailwind preset. '
                     'Platform-neutral.'),
        feature_card('DOC', HexColor('#5F5CF0'), 'Storybook as the spec',
                     'Every component has stories with all variants and states. '
                     'PMs and backend devs use it as the live spec.'),
        feature_card('A11Y', HexColor('#0F9F80'), 'Accessibility built-in',
                     'Radix Primitives under each overlay and form control: '
                     'keyboard nav, focus trap, ARIA, reduced motion -- free.'),
    ]
    out.append(feature_grid(cards))
    out.append(Spacer(1, 16))
    out.append(Callout(
        'info',
        'When to use it:',
        'Any new Chekin frontend screen. Refactors of existing surfaces '
        '(Dashboard first). Backend-built admin tools. Marketing landing '
        'pages that need the Chekin look.',
    ))
    return out


def build_section_2():
    out = []
    out.append(SectionHeader(
        2, 'Repository structure',
        'Where the kit lives and how it is organised.',
    ))
    out.append(Spacer(1, 10))
    out.append(Paragraph(
        'The kit is a pnpm + Turbo monorepo at '
        '<font name="Courier">/Users/carloslagares/ClaudeCode/chekin-ui/</font> -- '
        '<b>a sibling of the DesignSystem spec folder, not inside it</b>. '
        'The older <font name="Courier">ui_kits/</font> folder inside the '
        'DesignSystem master library is a static-HTML reference only and is '
        'never edited from this project.',
        P_BODY,
    ))
    out.append(Spacer(1, 6))
    tree = (
        'chekin-ui/\n'
        'package.json               pnpm workspace root\n'
        'pnpm-workspace.yaml\n'
        'turbo.json\n'
        'tsconfig.base.json\n'
        'packages/\n'
        '  tokens/                  @chekin/tokens\n'
        '    src/\n'
        '      tokens.json          # Tokens Studio format\n'
        '      tokens.css           # CSS custom properties\n'
        '      tailwind-preset.js   # Drop-in Tailwind preset\n'
        '  ui/                      @chekin/ui  (React components)\n'
        '    src/\n'
        '      button/  checkbox/  divider/  input/\n'
        '      line-chart/  radio/  rating-stars/  select/\n'
        '      stat-card/  switch/  textarea/\n'
        '      lib/cn.ts            className merger (clsx + tw-merge)\n'
        'apps/docs/                 Storybook 8 + Vite\n'
        '  .storybook/\n'
        '  stories/\n'
        'docs/                      This handbook (PDF + generator)'
    )
    out.append(CodeBlock('CHEKIN-UI LAYOUT', tree))
    out.append(Spacer(1, 12))
    out.append(Callout(
        'tip',
        'For a zip deliverable:',
        'Export the whole chekin-ui/ folder, excluding node_modules/, dist/, '
        '.turbo/, and storybook-static/. Devs run pnpm install then '
        'pnpm storybook to get started.',
    ))
    return out


def build_section_3():
    out = []
    out.append(SectionHeader(
        3, 'Technical stack and decisions',
        'What we chose, what we rejected, and why.',
    ))
    out.append(Spacer(1, 10))
    out.append(Paragraph(
        'Every decision below is load-bearing. Changing one means revisiting '
        'the whole kit, so they\'re documented explicitly. Future maintainers '
        'should feel free to propose changes, but not drift silently.',
        P_BODY,
    ))
    out.append(Spacer(1, 6))
    decisions = [
        ('Package manager',
         'pnpm workspaces + Turbo',
         'npm workspaces, Yarn workspaces, Nx',
         'Fast install, first-class monorepo support, strict dependency resolution, '
         'remote caching via Turbo.'),
        ('Component behaviour',
         'Radix Primitives',
         'React Aria (more granular, more i18n), shadcn (copy-paste), roll-your-own',
         'Accessibility, keyboard handling, and focus management solved out of the box. '
         'Still composable -- we own the look, Radix owns the behaviour.'),
        ('Variant management',
         'class-variance-authority + tailwind-merge via a cn() helper',
         'styled-components, Stitches, Vanilla Extract',
         'Keeps everything inside Tailwind, tree-shakes well, no runtime CSS-in-JS overhead.'),
        ('Styling engine',
         'Tailwind CSS with a @chekin/tokens preset',
         'CSS Modules, Vanilla Extract, Panda',
         'Consumer flexibility (Vite / Next / Remix all work), zero runtime cost, '
         'one preset exposes all tokens as class names.'),
        ('Docs',
         'Storybook 8 on Vite',
         'Ladle, Docusaurus, custom site',
         'Industry-standard, autodocs, Chromatic-compatible for visual regression.'),
        ('Bundler for @chekin/ui',
         'tsup',
         'Rollup, tsc --emit, Vite library mode',
         'Zero-config, dual ESM + CJS output with types, source maps included.'),
        ('Icons',
         'Lucide as the default set (plus project-specific SVG)',
         'Heroicons, Phosphor, Tabler',
         'Lucide matches Chekin\'s 1.5-2px stroke profile closely; tree-shakes; '
         'open, widely adopted.'),
    ]
    for name, chosen, alts, reason in decisions:
        out.append(DecisionBlock(name, chosen, alts, reason))
        out.append(Spacer(1, 8))
    return out


def build_section_4():
    out = []
    out.append(SectionHeader(
        4, 'Design tokens',
        'The full palette, type scale, spacing, radii and shadows.',
    ))
    out.append(Spacer(1, 8))

    out.append(Paragraph('Brand colors', P_H3))
    out.append(color_table([
        color_swatch_row('#385BF8', 'Main Blue',
                         'The singular brand accent -- CTAs, links, focus rings, active states.'),
        color_swatch_row('#19194B', 'Dark',
                         'Marketing navy. Hero headings on the Web surface.'),
        color_swatch_row('#161643', 'Navy',
                         'Product navy. Default text color on Dashboard and admin surfaces.'),
        color_swatch_row('#002CFA', 'Gradient start',
                         'Beginning of the large dark-blue gradient (hero bands only).'),
        color_swatch_row('#274BF0', 'Gradient end',
                         'End of the hero gradient.'),
        color_swatch_row('#FF2467', 'Red',
                         'Errors, destructive actions, and rare brand energy accents.'),
    ]))
    out.append(Spacer(1, 14))

    out.append(Paragraph('Blue accents', P_H3))
    out.append(color_table([
        color_swatch_row('#5975F5', 'Blue Hover',
                         'Link hover and subtle interactive highlights.'),
        color_swatch_row('#294DF1', 'Animation Blue',
                         'Animated hero keywords (Web surface only).'),
        color_swatch_row('#5F5CF0', 'Divider Blue',
                         'Specific dividers where a blue tint is desired.'),
        color_swatch_row('#23235D', 'Dark Blue',
                         'Property card titles -- a deliberate half-shade off Navy.'),
    ]))
    out.append(Spacer(1, 14))

    out.append(Paragraph('Grays', P_H3))
    out.append(color_table([
        color_swatch_row('#6B6B95', 'Gray 1',
                         'Secondary text and body copy.'),
        color_swatch_row('#9696B9', 'Gray 2',
                         'Captions, tertiary text.'),
        color_swatch_row('#DEDEEB', 'Gray 3',
                         'Borders and dividers.'),
        color_swatch_row('#CECEDE', 'Gray Separator',
                         'Subtle separators inside dense layouts.'),
    ]))
    out.append(Spacer(1, 14))

    out.append(Paragraph('Surfaces', P_H3))
    out.append(color_table([
        color_swatch_row('#F4F6F8', 'Input Empty',
                         'Background of empty text inputs. Never pure white.'),
        color_swatch_row('#EFF6FF', 'Autocomplete',
                         'Background of autocompleted inputs.'),
        color_swatch_row('#F0F3FF', 'Pressed Blue',
                         'Icon button pressed / soft-blue chip backgrounds.'),
        color_swatch_row('#EFEFFF', 'Card',
                         'Subtle blue-tinted card surfaces.'),
        color_swatch_row('#F4F4FD', 'Promo Lavender',
                         'Marketing-only promotional pills.'),
    ]))
    out.append(Spacer(1, 14))

    out.append(Paragraph('Typography', P_H3))
    out.append(basic_table(
        ['Family', 'Used for', 'Weights'],
        [
            ['Montserrat', 'All standard UI (primary family)', '400 / 500 / 600 / 700 / 800'],
            ['Inter', 'Display only - 64px section headings', '700'],
            ['Poppins', 'Code input cells and Guest App / SDK', '400 / 500 / 600'],
        ],
        [120, CONTENT_W - 120 - 160, 160],
    ))
    out.append(Spacer(1, 10))
    out.append(Paragraph(
        '<b>Type scale:</b> h1 70  -  section-display 64  -  h2 44  -  h3 36  -  '
        'h4 22  -  body-highlight 20  -  body-list 18  -  body 16  -  small 14  -  caption 12. '
        '<b>Medium (500)</b> is the body default, not Regular (400) -- the brand '
        'favours slightly heavier body weight for screen readability.',
        P_BODY,
    ))
    out.append(Spacer(1, 10))

    out.append(Paragraph('Spacing (8px base)', P_H3))
    out.append(basic_table(
        ['Token', 'Value', 'Token', 'Value'],
        [
            ['space-0-5', '4px', 'space-3', '24px'],
            ['space-1', '8px', 'space-4', '32px'],
            ['space-1-25', '10px', 'space-5', '40px'],
            ['space-1-375', '11px', 'space-6', '48px'],
            ['space-2', '16px', '', ''],
        ],
        [CONTENT_W / 4 - 10, CONTENT_W / 4 - 10, CONTENT_W / 4 - 10, CONTENT_W / 4 + 30],
    ))
    out.append(Spacer(1, 14))

    out.append(Paragraph('Radii', P_H3))
    out.append(basic_table(
        ['Token', 'Value', 'Used on'],
        [
            ['radius-input', '6px', 'Dashboard buttons (M/S/XS) - the canonical admin shape'],
            ['radius-standard', '8px', 'Input fields, dropdown panels, modal bodies'],
            ['radius-card', '14px', 'Testimonial cards, large surface cards'],
            ['radius-circle', '25px', 'Icon buttons (43x43 circular)'],
            ['radius-pill', '51px', 'Marketing promo pills - never inside the product'],
        ],
        [120, 80, CONTENT_W - 200],
    ))
    out.append(Spacer(1, 14))

    out.append(Paragraph('Shadows', P_H3))
    out.append(Paragraph(
        'Shadows are blue-tinted (<font name="Courier">rgba(26,148,255,...)</font>), '
        'never pure black. This is the hidden brand detail -- even on white, '
        'the shadow whispers blue.',
        P_BODY,
    ))
    out.append(basic_table(
        ['Token', 'Value', 'Use'],
        [
            ['focus-ring', '0 0 0 3px rgba(56,91,248,0.2)', 'Every focusable element'],
            ['shadow-card', '0 0 5px rgba(26,148,255,0.173)', 'Card at rest'],
            ['shadow-card-hover', '0 20px 25px rgba(26,148,255,0.173)', 'Card on hover'],
            ['shadow-dropdown', '0 5px 15px rgba(26,148,255,0.16)', 'Open dropdowns, popovers'],
            ['shadow-large-elevation', '0 31px 50px rgba(26,140,255,0.1)', 'High-emphasis floating elements'],
        ],
        [160, 230, CONTENT_W - 390],
    ))
    return out


def build_section_5():
    out = []
    out.append(SectionHeader(
        5, 'Non-negotiables',
        'Brand rules that make a screen "feel like Chekin".',
    ))
    out.append(Spacer(1, 10))
    out.append(Paragraph(
        'These are the rules that separate a Chekin screen from a generic '
        'Bootstrap one. Every component in the kit already encodes them. When '
        'you compose screens, respect them.',
        P_BODY,
    ))
    out.append(Spacer(1, 8))
    out.append(Checklist([
        '<b>Main Blue (#385BF8) is the singular accent</b> -- never as a large background. Use Gradient Blue for hero bands instead.',
        '<b>Dashboard buttons use 6px radius</b>, heights 40/32/24 (M/S/XS). Never pills inside the admin UI.',
        '<b>Pill shape (full radius) is reserved</b> for AI / conversational / special moments (Ask Vela, suggestion chips, the variant tab switcher).',
        '<b>Empty inputs are #F4F6F8</b> (gray-tinted), never pure white -- the empty state must be visually distinct from a filled one.',
        '<b>Filled inputs get a #161643 (Navy) 1px border</b> as the "this field has content" signal.',
        '<b>Hover is an overlay</b> (white 10% or black 10%) on top of the base color. Never change the shadow on hover.',
        '<b>Focus ring is always present</b>: 3px rgba(56,91,248,0.2) on every focusable element.',
        '<b>Disabled = opacity 0.3</b> on the whole element. Do not gray out individual colors.',
        '<b>Headings use Navy #161643</b> (product) or Dark #19194B (marketing) -- never pure black.',
        '<b>Shadows are blue-tinted</b> (rgba(26,148,255,...)), never pure black, in the product UI.',
    ]))
    return out


def build_section_6():
    out = []
    out.append(SectionHeader(
        6, 'Components shipped (v0.2)',
        'What is already in the kit.',
    ))
    out.append(Spacer(1, 10))
    out.append(Paragraph(
        'Thirty-three components are shipped in v0.2. Each has a Storybook story '
        'with every variant, state and interactive control. When a Figma source '
        'is listed, the component maps to a named entry in the Chekin Dashboard '
        'Library; "Free-form" means the pattern exists in Figma files but is '
        'not a named shared component.',
        P_BODY,
    ))
    out.append(Spacer(1, 6))

    out.append(Paragraph('Form + action', P_H3))
    out.append(basic_table(
        ['Component', 'Figma source', 'Notes'],
        [
            ['Button', 'Button (component_set)', 'Variants primary/secondary/tertiary/destructive; sizes m/s/xs; shapes rounded (admin) + pill (AI).'],
            ['IconButton', 'Icon button', '32/40/43px sizes; variants primary/secondary/ghost/danger; rounded or circle.'],
            ['Input', 'Free-form', 'Label, supporting text, error text; state auto-derived.'],
            ['Textarea', 'Free-form', 'Inherits Input style; 80px min-height; vertical resize.'],
            ['Checkbox', 'Free-form', 'Label + optional description; indeterminate supported.'],
            ['Radio + RadioGroup', 'Free-form', 'Composed via Radix RadioGroup primitive.'],
            ['Switch', 'Controls / Toggle', '36x20 pill with knob; accepts optional label.'],
            ['Select', '02. Dropdown Field', 'Radix Select wrapper + convenience <Select>.'],
            ['SelectableCard', 'Plan / Protection Type Box', 'Radio-style clickable card: icon + title + description + optional price.'],
        ],
        [130, 140, CONTENT_W - 270],
    ))
    out.append(Spacer(1, 10))

    out.append(Paragraph('Display', P_H3))
    out.append(basic_table(
        ['Component', 'Figma source', 'Notes'],
        [
            ['Badge', 'Status Badge', 'Tones x appearances (soft/solid/outline); optional dot.'],
            ['Tag', 'Tag', 'Neutral label with optional remove.'],
            ['Chip', 'Selected Properties Chip / Filter reel', 'Selectable filter with count + removal.'],
            ['Avatar', 'Free-form', 'Initials or image; sizes xs/s/m/l.'],
            ['FramedIcon', 'Framed Icon', 'Icon in a coloured frame; size + tone + shape.'],
            ['ProgressBar', 'Free-form', 'Linear with optional label + value, tones.'],
            ['StatCard', 'Overview Panel', 'Icon chip + label + value + trend pill + caption.'],
            ['RatingStars', 'Free-form', '0-5 half-star; Main Blue filled.'],
            ['LineChart', 'Free-form (Recharts)', 'Single-series area chart; Chekin tooltip.'],
            ['Divider', 'Line primitive', 'Horizontal or vertical; solid or dashed.'],
            ['Card', 'Free-form', 'Container + Header/Title/Description/Footer.'],
            ['ExternalLink', 'Free-form', 'Anchor with arrow-out icon.'],
            ['Breadcrumb', 'Free-form', 'Chevron-separated nav trail.'],
            ['EmptyState', 'Free-form', 'Icon + title + description + optional action.'],
        ],
        [130, 140, CONTENT_W - 270],
    ))
    out.append(Spacer(1, 10))

    out.append(Paragraph('Overlays', P_H3))
    out.append(basic_table(
        ['Component', 'Figma source', 'Notes'],
        [
            ['Dialog / Modal', 'Modal (Mobile)', 'Radix Dialog; sizes s/m/l; Header/Body/Footer + close.'],
            ['Tooltip', 'Tooltip', 'Radix Tooltip; 4 sides; convenience wrapper.'],
            ['HelpTooltip', 'Help Tooltip (16x16)', 'Small info-icon trigger + tooltip.'],
            ['Popover', 'Free-form', 'Radix Popover; filter panels, date-picker content.'],
            ['DropdownMenu', 'More Actions Button', 'Items + labels + separators.'],
            ['Toast', 'Toast Notification', 'Radix Toast; tones; auto-dismiss + swipe.'],
            ['Callout', 'Callout', 'Coloured left-border banner; 5 tones.'],
        ],
        [130, 140, CONTENT_W - 270],
    ))
    out.append(Spacer(1, 10))

    out.append(Paragraph('Calendar family (Airbnb-style)', P_H3))
    out.append(basic_table(
        ['Component', 'Figma source', 'Notes'],
        [
            ['Calendar', 'Calendar (component_set)', 'react-day-picker v9; single/multiple/range modes; 1 or 2 months.'],
            ['DatePicker', 'Date Input Field', 'Field + Popover + single-mode Calendar.'],
            ['DateRangePicker', 'Free-form', 'Two-column date field + two-month Calendar in range mode.'],
        ],
        [130, 140, CONTENT_W - 270],
    ))
    out.append(Spacer(1, 14))

    out.append(Paragraph('Roadmap -- next to build', P_H3))
    out.append(Paragraph(
        '<font color="#6B6B95">Data & nav:</font> Tabs, Accordion, Pagination, Toolbar, Table, SplitButton, StatusCluster.<br/>'
        '<font color="#6B6B95">Calendar stack:</font> TimePicker.<br/>'
        '<font color="#6B6B95">Layout shells:</font> AppShell (Rail 56px + Sidebar 264px + TopBar + content), AIPanel, SettingsFooter pattern.',
        P_BODY,
    ))
    return out


def build_section_7():
    out = []
    out.append(SectionHeader(
        7, 'Usage examples',
        'Import and compose.',
    ))
    out.append(Spacer(1, 10))
    out.append(Paragraph(
        'Every example below imports from the top-level <font name="Courier">@chekin/ui</font> '
        'entry point. Types come through automatically.',
        P_BODY,
    ))
    out.append(Spacer(1, 6))

    out.append(CodeBlock('BUTTON - 6px Dashboard action', (
        "import { Button } from '@chekin/ui';\n"
        "\n"
        "<Button variant=\"primary\" size=\"m\">New booking</Button>\n"
        "<Button variant=\"primary\" shape=\"pill\">Ask Vela</Button>\n"
        "<Button variant=\"secondary\" leftIcon={<Icon />}>Export</Button>"
    )))
    out.append(Spacer(1, 10))
    out.append(CodeBlock('INPUT - auto state derivation', (
        "import { Input } from '@chekin/ui';\n"
        "\n"
        "<Input\n"
        "  label=\"Property name\"\n"
        "  placeholder=\"e.g. Casa Azul\"\n"
        "  supportingText=\"This name is visible to guests.\"\n"
        "/>\n"
        "// state auto-resolves to empty / filled / error based on value + errorText"
    )))
    out.append(Spacer(1, 10))
    out.append(CodeBlock('STATCARD - the dashboard tile', (
        "import { StatCard } from '@chekin/ui';\n"
        "\n"
        "<StatCard\n"
        "  icon={<CalendarCheck />}\n"
        "  label=\"Total bookings\"\n"
        "  value=\"2,481\"\n"
        "  trend={12.4}\n"
        "  caption=\"vs. last month\"\n"
        "/>"
    )))
    out.append(Spacer(1, 10))
    out.append(CodeBlock('LINECHART - single-series area chart', (
        "import { LineChart } from '@chekin/ui';\n"
        "\n"
        "<LineChart\n"
        "  data={[{ x: 'Jan', y: 118000 }, { x: 'Feb', y: 124300 }]}\n"
        "  height={320}\n"
        "  valueFormatter={(v) => `EUR ${Math.round(v / 1000)}K`}\n"
        "/>"
    )))
    return out


def build_section_8():
    out = []
    out.append(SectionHeader(
        8, 'Getting started',
        'Install, run, and consume the kit.',
    ))
    out.append(Spacer(1, 10))

    steps = [
        ('Clone or unzip',
         'Clone the chekin-ui repo, or unzip the deliverable into your workspace at /chekin-ui/.'),
        ('Install dependencies',
         'Run pnpm install from the chekin-ui root. Requires Node 20+ and pnpm 10+.'),
        ('Start Storybook',
         'pnpm storybook  -  opens http://localhost:6006 with every component catalogued.'),
        ('Typecheck',
         'pnpm typecheck runs tsc --noEmit across every workspace package.'),
        ('Consume as a package',
         'In the consumer app, add "@chekin/ui": "workspace:*" to package.json (or install from the private npm registry once v1.0 is published).'),
        ('Import components',
         "import { Button, Input, StatCard } from '@chekin/ui' -- types come through automatically."),
        ('Include the tokens',
         "import '@chekin/tokens/tokens.css' at your app root, or extend your tailwind.config with @chekin/tokens/tailwind-preset."),
    ]
    for i, (title, body) in enumerate(steps, start=1):
        out.append(NumberedStep(i, title, body))
        out.append(Spacer(1, 10))
    out.append(Callout(
        'warn',
        'Important:',
        "Don\'t fork this repo per product. Consume it via the versioned "
        'package so everyone benefits from fixes and new components. If you '
        'need something that does not exist yet, open an issue or PR against '
        'chekin-ui -- never inline a divergent component inside your product.',
    ))
    return out


def build_section_9():
    out = []
    out.append(SectionHeader(
        9, 'The two sources of truth',
        'Figma is for what; canonical is for how.',
    ))
    out.append(Spacer(1, 10))
    out.append(Paragraph(
        'Two artefacts govern the kit, each with a different authority. '
        'Understanding the split prevents every confusion that would otherwise '
        'cost a designer-eng round-trip.',
        P_BODY,
    ))
    out.append(Spacer(1, 6))

    # Two-column comparison
    header_cell = Paragraph('<b>Figma Dashboard Library</b>', P_TABLE_H)
    header_cell_2 = Paragraph('<b>Canonical preview</b>', P_TABLE_H)
    body_l = Paragraph(
        '<b>Authoritative for WHAT.</b><br/><br/>'
        'The component inventory, names, variants, and intended behaviour. '
        'When we ask "what components does the Dashboard have?", Figma answers. '
        '<br/><br/>'
        '<font color="#6B6B95">Team:</font> Product Design<br/>'
        '<font color="#6B6B95">Project ID:</font> 78354711<br/>'
        '<font color="#6B6B95">Library:</font> "Dashboard Library"<br/>'
        '<font color="#6B6B95">Enumerate:</font> Figma MCP search_design_system',
        P_TABLE_CELL,
    )
    body_r = Paragraph(
        '<b>Authoritative for HOW.</b><br/><br/>'
        'Visual styling: typography (Montserrat), sizing (6px admin radius, 40px '
        'button heights), palette (Main Blue single accent), no colourful '
        'per-metric chips. When we ask "what should it look like?", canonical answers.'
        '<br/><br/>'
        '<font color="#6B6B95">Repo:</font> carloslagares/chekin-dashboard-preview<br/>'
        '<font color="#6B6B95">Mirrored at:</font> ui_kits/canonical/ in the master library<br/>'
        '<font color="#6B6B95">Re-sync:</font> git clone + rsync procedure (see repo README)',
        P_TABLE_CELL,
    )
    t = Table([[header_cell, header_cell_2], [body_l, body_r]],
              colWidths=[CONTENT_W / 2, CONTENT_W / 2])
    t.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), BLUE),
        ('BACKGROUND', (0, 1), (-1, 1), WHITE),
        ('BOX', (0, 0), (-1, -1), 0.5, GRAY_3),
        ('LINEAFTER', (0, 0), (0, -1), 0.5, GRAY_3),
        ('LEFTPADDING', (0, 0), (-1, -1), 14),
        ('RIGHTPADDING', (0, 0), (-1, -1), 14),
        ('TOPPADDING', (0, 0), (-1, -1), 10),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 10),
        ('VALIGN', (0, 1), (-1, 1), 'TOP'),
    ]))
    out.append(t)
    out.append(Spacer(1, 14))
    out.append(Callout(
        'note',
        'Tiebreaker:',
        'When Figma and canonical disagree on anything visual, CANONICAL WINS. '
        'When they disagree on whether a component should exist, FIGMA WINS. '
        'Never propose updating canonical to match Figma\'s older visual treatment.',
    ))
    return out


def build_section_10():
    out = []
    out.append(SectionHeader(
        10, 'Contributing and ownership',
        'Who owns it, how to add to it.',
    ))
    out.append(Spacer(1, 10))
    out.append(Paragraph('Ownership', P_H3))
    out.append(Paragraph(
        '<b>Design system owners:</b> 1 designer + 1 engineer (names assigned by '
        'Carlos). Both approve any new component, token change, or breaking API. '
        'Without explicit owners, the system drifts.',
        P_BODY,
    ))

    out.append(Paragraph('Adding a new component', P_H3))
    out.append(Paragraph(
        '1. Open an RFC issue with: the component name, variants, proposed '
        'props, a Figma link, and a screenshot from canonical if available.<br/>'
        '2. Wait for approval from both owners.<br/>'
        '3. Open a PR with: (a) the component under '
        '<font name="Courier">packages/ui/src/&lt;name&gt;/</font>, (b) a '
        'Storybook story covering every variant and state, (c) updated '
        'exports from <font name="Courier">src/index.ts</font>.<br/>'
        '4. Typecheck must pass (<font name="Courier">pnpm typecheck</font>). '
        'Visual regression diff via Chromatic (once wired).',
        P_BODY,
    ))

    out.append(Paragraph('Versioning', P_H3))
    out.append(Paragraph(
        'Changesets-based semver. <b>Patch</b> for bug fixes. <b>Minor</b> for '
        'new components or non-breaking prop additions. <b>Major</b> for '
        'breaking prop changes. Every change requires a <font name="Courier">.changeset</font> entry in the PR; CI fails otherwise.',
        P_BODY,
    ))

    out.append(Paragraph('Visual regression', P_H3))
    out.append(Paragraph(
        'Chromatic to be wired before v1.0 -- every Storybook story becomes a '
        'visual baseline, every PR renders a diff. This is the closest the '
        'kit gets to a "canary test" for design drift.',
        P_BODY,
    ))
    return out


def build_section_11():
    out = []
    out.append(SectionHeader(
        11, 'Roadmap to v1.0',
        'Milestones and sequencing.',
    ))
    out.append(Spacer(1, 10))
    milestones = [
        ('Complete Dashboard primitives',
         'Action, Display, Overlay, Data & Nav. About 20 components remaining. ~4 focused weeks.'),
        ('Calendar + date stack',
         'Calendar, DatePicker, DateRangePicker, TimePicker. Calendar is a named Figma component_set. ~1 week.'),
        ('Layout shells',
         'AppShell (Rail 56px + Sidebar 264px + TopBar + content), AIPanel, SettingsFooter pattern. ~1 week.'),
        ('Dogfood a real page',
         'Rebuild one real Chekin Dashboard screen (Bookings or Properties) end-to-end against the kit. Surface gaps, fix them.'),
        ('Deploy Storybook publicly',
         'GitHub Pages or Vercel so frontend and backend devs can consult without running the repo locally. PDF handbook hosted alongside.'),
        ('Publish v1.0',
         'Push @chekin/tokens and @chekin/ui to the private npm registry. Tag release. Announce internally.'),
    ]
    for i, (title, body) in enumerate(milestones, start=1):
        out.append(NumberedStep(i, title, body))
        out.append(Spacer(1, 10))
    out.append(Callout(
        'tip',
        'Success criterion for v1.0:',
        'One production Chekin Dashboard screen is shipped consuming only '
        '@chekin/ui. No inlined components, no local token overrides.',
    ))
    return out


def build_appendix():
    out = []
    out.append(SectionHeader(
        None, 'Glossary', 'Short definitions of terms used in this handbook.'))
    out.append(Spacer(1, 10))
    # Definitions may contain ReportLab inline markup (e.g. <font name="Courier">);
    # they are NOT passed through escape(). Only the term name is escaped.
    terms = [
        ('Canonical',
         'The mirrored reference preview at '
         '<font name="Courier">ui_kits/canonical/</font> (sourced from '
         'github.com/carloslagares/chekin-dashboard-preview). '
         'The visual source of truth.'),
        ('Primitive',
         'A low-level reusable component (Button, Input, Switch, etc.). '
         'Distinguished from a pattern (composition like SettingsFooter) '
         'or a page recipe (full screen).'),
        ('Pattern / Recipe',
         'A higher-level composition of primitives (e.g. DashboardLayout, '
         'EmptyState, SettingsFooter).'),
        ('Rail',
         'The 56px primary icon-only navigation column on the left edge '
         'of the Dashboard shell.'),
        ('Sidebar',
         'The 264px secondary navigation column immediately to the right '
         'of the Rail, scoped to the current section.'),
        ('Surface',
         'A branded environment (Web, Dashboard, Onboarding, Guest App, '
         'Guest SDK, Host SDK). Surfaces share tokens but can diverge in '
         'chrome and component shape (e.g. pill buttons on Guest App).'),
        ('Shape vs Variant',
         'On the <font name="Courier">Button</font> component: <b>shape</b> '
         'controls geometry (rounded / pill); <b>variant</b> controls '
         'visual treatment (primary / secondary / tertiary / destructive). '
         'They compose independently.'),
    ]
    for name, defn in terms:
        out.append(Paragraph(f'<b>{escape(name)}</b>', P_BODY))
        out.append(Paragraph(clean(defn), P_BODY_GRAY))
        out.append(Spacer(1, 4))
    return out


# -------------------------------------------------- Doc template build ---

class SectionAwareDocTemplate(BaseDocTemplate):
    """Tracks the current section number for the footer.

    We hook `afterFlowable`, which fires AFTER a flowable is placed on the
    page. Combined with the page template's `onPageEnd` callback, this
    guarantees the footer for the page that contains a SectionHeader reads
    that section's number (not the previous page's).
    """

    def afterFlowable(self, flowable):
        if isinstance(flowable, SectionHeader) and flowable.number:
            self._cur_section = flowable.number


def build_pdf(output_path):
    doc = SectionAwareDocTemplate(
        output_path,
        pagesize=A4,
        leftMargin=MARGIN,
        rightMargin=MARGIN,
        topMargin=MARGIN + 10,
        bottomMargin=MARGIN + 10,
        title='Chekin UI Kit - Frontend Handbook v0.2',
        author='Chekin',
    )
    doc._cur_section = 1

    cover = PageTemplate(
        id='cover',
        frames=[Frame(0, 0, PAGE_W, PAGE_H, id='cover_f', leftPadding=0, rightPadding=0,
                      topPadding=0, bottomPadding=0, showBoundary=0)],
        onPage=draw_cover,
    )
    content = PageTemplate(
        id='content',
        frames=[Frame(
            MARGIN, FOOTER_Y + 28,
            CONTENT_W, PAGE_H - MARGIN - (FOOTER_Y + 28),
            id='content_f',
            leftPadding=0, rightPadding=0, topPadding=0, bottomPadding=0,
            showBoundary=0,
        )],
        # Draw footer at page end so _cur_section reflects the header
        # that was placed on THIS page (afterFlowable has already fired).
        onPageEnd=draw_content_chrome,
    )
    doc.addPageTemplates([cover, content])

    story = []
    # Force the cover template for page 1, then switch to content for the rest.
    from reportlab.platypus import NextPageTemplate
    story.append(NextPageTemplate('content'))
    story.append(PageBreak())

    section_builders = [
        build_section_1, build_section_2, build_section_3, build_section_4,
        build_section_5, build_section_6, build_section_7, build_section_8,
        build_section_9, build_section_10, build_section_11,
    ]
    for i, builder in enumerate(section_builders, start=1):
        for flow in builder():
            story.append(flow)
        if i < len(section_builders):
            story.append(PageBreak())

    story.append(PageBreak())
    for flow in build_appendix():
        story.append(flow)

    doc.build(story)


if __name__ == '__main__':
    here = os.path.dirname(os.path.abspath(__file__))
    out = os.path.join(here, 'chekin-ui-kit-guide.pdf')
    build_pdf(out)
    size = os.path.getsize(out)
    print(f'Wrote {out} ({size/1024:.1f} KB)')
