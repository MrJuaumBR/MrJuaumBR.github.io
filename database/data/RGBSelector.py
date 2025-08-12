from PooPEngine2 import PooPEngine2
import pygame as pyg
from pygame.locals import *
from sys import exit
from pyperclip import copy

"""
Requirements:
PooPEngine 2: https://mrjuaumbr.github.io
PyGame: pip install pygame
Pyperclip: pip install pyperclip
"""

SCREEN_WIDTH = 800
SCREEN_HEIGHT = 600
SCREEN_SIZE = (SCREEN_WIDTH,SCREEN_HEIGHT)

ppe = PooPEngine2()
ppe.create_screen(SCREEN_SIZE,flags=SHOWN)
pyg.display.set_caption('RGB Selector')

pyg.init()

ppe.create_sysFont('arial',24)

SLIDER_STARTX = 50

R = 0
RX = SLIDER_STARTX
G = 0
GX = SLIDER_STARTX
B = 0
BX = SLIDER_STARTX

while True:
    RX, R = ppe.draw_slider((SLIDER_STARTX,100),600,RX,((0,0,0),(200,100,100)))
    GX, G = ppe.draw_slider((SLIDER_STARTX,200),600,GX,((0,0,0),(100,200,100)))
    BX, B = ppe.draw_slider((SLIDER_STARTX,300),600,BX,((0,0,0),(100,100,200)))
    R *=255
    G *=255
    B *=255
    ppe.draw_rect((50,350),(600,75),(R,G,B))
    ppe.draw_text((50,425),f"{int(R),int(G),int(B)}       {ppe.rgb_to_hex(int(R),int(G),int(B))}",0,(0,0,0))
    if ppe.draw_button((50,450),"Copy RGB",0,(0,0,0),(190,190,190)):
        copy(f'{int(R),int(G),int(B)}')
    elif ppe.draw_button((150,450),"Copy HEX",0,(0,0,0),(190,190,190)):
        copy(f"{ppe.rgb_to_hex(int(R),int(G),int(B))}")
    for ev in ppe.events():
        if ev.type == QUIT:
            pyg.quit()
            exit()

    ppe.update()
    ppe.screen.fill((255,255,255))
