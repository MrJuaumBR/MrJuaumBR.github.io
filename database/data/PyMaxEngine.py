# Imports
import pygame as pyg # PyGame Dependecies
from pygame.locals import * # PyGame Dependecies
import os # ?
from sys import exit # PyGame quit
from datetime import datetime # Screenshots
from requests import get # Load Version
from json import loads # Load Version
from colorama import Fore # Color for terminal

"""
Requires:
pygame;
requests;
"""
# Exceptions
class OutdatedExc(Exception):
    def __init__(self,message="Can't run Engine because: Version is outdated."):
        """Excpetion for version"""
        self.message =message + "\n> Download a updated version here: https://mrjuaumbr.github.io"
        super().__init__(self.message)
# Notes
"""
Fix bugs, implement some features, new name(Old: PooPEngine2 > New: PyMaxEngine), don't crash if already exists a same font, warn if not updated and color for terminal in some cases
 - 0.3;
"""

# Variables
strftime = "%d.%m.%Y_%H%M%S"
colors = {}

# Main
class PyMaxEngine():
    """PyMaxEngine"""
    def __init__(self,screen:pyg.surface=None) -> None:
        """A simple Engine for complement pygame and make it easier"""
        self.Name = "PyMaxEngine"
        self.ver = self.version()
        self.fonts = []
        self.screen = screen
        self.colors = colors
        # Check if Updated
        self.check_update()

        self.screenshot_path = 'screenshot_'
        self.requirements = ["pygame>=2.5.0","requests>=2.31.0"] # Requirements
        self.set_colors()
        pyg.init()
    def set_colors(self):
        """Set colors"""
        c = self.get_colors()
        for color in c:
            self.colors[str(color)] = c[color]
            self.colors[str(color).upper()] = c[color]
            self.colors[str(color).lower()] = c[color]
    def get_colors(self):
        """Get Colors source"""
        r = get('https://mrjuaumbr.github.io/data/colors.json')
        r = loads(r.text)
        return r

    def check_update(self):
        """"Check if it is updated"""
        ver_source = self.get_source()['apps']
        for key in ver_source:
            if key['name'] == self.Name:
                if not (float(self.v()) >= float(key["version"])):
                    raise OutdatedExc()
    
    def get_source(self):
        """Get the source json for check update"""
        r = get("https://raw.githubusercontent.com/MrJuaumBR/MrJuaumBR.github.io/main/data/applications.json")
        r = loads(r.text)
        return r

    def requirements_gen(self):
        """Generate a requirements.txt for pip install"""
        with open('requirements.txt','w+') as f:
            f.writelines(self.requirements)

    def version(self):
        """Get version place"""
        return f"{self.v()} - {self.Name}: https://mrjuaumbr.github.io"
    
    def v(self):
        """Get version number"""
        return "0.3"

    def create_screen(self,size:tuple or list,**kwargs):
        """Create a screen and return, TIP: Don't use Fullscreen windows or use Scaled(auto)"""
        if not self.screen:
            if kwargs.get('flags'): # Scale if fullscreen and not Scaled
                if str(kwargs.get('flags')) == str(-2147483648):
                    kwargs.update(flags=-2147483136)
                    print(f"{Fore.GREEN}Fullscreen withou scaled, scaled!{Fore.RESET}")
            os.environ['SDL_VIDEO_CENTERED'] = '1'
            if kwargs:
                self.screen = pyg.display.set_mode(size,**kwargs)
            else:
                self.screen =pyg.display.set_mode(size)
            return self.screen
        else:
            print(f"{Fore.RED}You already have a screen!{Fore.RESET}")

    def create_sysFont(self,name:str,size:int,bold=False,italic=False) -> pyg.font:
        """Create a font and return"""
        r = pyg.font.SysFont(name, size, bold, italic)
        
        if r in self.fonts:
            print(f"{Fore.RED}Font already exists in index: {self.fonts.index(r)}{Fore.RESET}")
        else:
            self.fonts.append(r)
            print(f"Font created in index: {self.fonts.index(r)}")
        return r
    
    def draw_circle(self,Position:tuple or list,color:tuple, radius:int) -> pyg.Rect:
        """Draw a circle"""
        o = pyg.draw.circle(self.screen,color,Position,radius)
        return o
    
    def load_image(self,path) ->pyg.image:
        """Load a image"""
        i = pyg.image.load(path)
        return i
    
    def draw_image(self,image:str or pyg.image,Position: tuple or list) -> pyg.surface:
        """Draw a image"""
        if type(image) == str:
            image = self.load_image(image)
        r = image.get_rect()
        r.topleft = Position
        self.screen.blit(image,r)
        return image

    def resize_surface(self,surface:pyg.surface,size:tuple or list) -> pyg.surface:
        """Resize a surface by scale"""
        i = pyg.transform.scale(surface,size)
        return i

    def flip_surface(self,surface:pyg.surface,flip_x=False,flip_y=False) -> pyg.surface:
        """Flip a surface"""
        i = pyg.transform.flip(surface,flip_x,flip_y)
        return i

    def rotate_surface(self,surface:pyg.surface,angle:float) -> pyg.surface:
        """Rotate a surface"""
        i = pyg.transform.rotate(surface,angle)
        return i

    def draw_rect(self,Position:tuple or list,Size:tuple or list, color:tuple,border:int=0) -> pyg.Rect:
        """Draw a rect, it can have Alpha: (R,G,B,A)"""
        if len(color) == 4:
            o = pyg.Surface(Size,SRCALPHA)
            o.fill((color[0],color[1],color[2]))
            o.set_alpha(color[3])
            r = o.get_rect(topleft=Position)
            self.screen.blit(o,r)
            o = r
        elif len(color) == 3:
            o = pyg.draw.rect(self.screen,color,Rect(Position[0],Position[1],Size[0],Size[1]),border)
        return o

    def draw_slider(self,Position:tuple or list,Width:int,CurX:int,colors=((0,0,0),(200,200,200))):
        """Draw a slider control return current ball X and float between 0 - 1"""
        MaxX = Position[0] + Width
        self.draw_rect(Position,(Width,20),colors[0])
        b = self.draw_circle((CurX,Position[1]+10),colors[1],25)
        if b.collidepoint(pyg.mouse.get_pos()):
            if pyg.mouse.get_pressed(3)[0]:
                CurX = pyg.mouse.get_pos()[0]
                if CurX > MaxX:
                    CurX = MaxX
                elif CurX < Position[0]:
                    CurX = Position[0]
        Value = CurX/MaxX
        if Value > 1:
            Value = 1
        elif Value<0:
            Value = 0

        return CurX, Value

    def draw_text(self,Position: tuple or list,text:str,font: pyg.font or int, color:tuple or list,bgcolor=None, antialias=False):
        """Draw a text based into your font."""
        if type(font) == int:
            font = self.fonts[font]
        if bgcolor:
            r = font.render(text,antialias,color,bgcolor)
        else:
            r = font.render(text,antialias,color)
        r_rect = r.get_rect()
        r_rect.topleft = Position
        self.screen.blit(r,r_rect)
        return r_rect

    def draw_button(self,Position:tuple or list,text:str,font:pyg.font or int, color:tuple or list,bgcolor=None) -> bool:
        """Draw a button, return True it is pressed"""
        if self.draw_text(Position,text,font,color,bgcolor).collidepoint(pyg.mouse.get_pos()):
            if pyg.mouse.get_pressed(3)[0]:
                return True
            else:
                return False
        else:
            return False

    def draw_select(self,Position: tuple or list,items:list or tuple,cur_index:int,font:int or pyg.font,colors=((0,0,0),(200,200,100))):
        """Draw a select object, based in items list"""
        if type(font) == int:
            font = self.fonts[font]
        fix = font.size(items[cur_index])[0]
        self.draw_text((Position[0]-fix/4,Position[1]),items[cur_index],font,colors[0],colors[1])
        bback = self.draw_button((Position[0]-fix,Position[1]),"<",font,colors[0],colors[1])
        bnext = self.draw_button((Position[0]+fix,Position[1]),">",font,colors[0],colors[1])
        if bback:
            if cur_index-1<0:
                cur_index=len(items)-1
            else:
                cur_index -=1
        elif bnext:
            if cur_index +1>len(items)-1:
                cur_index = 0
            else:
                cur_index+=1
            
        return cur_index

    def draw_switch(self,Position: tuple or list,font:pyg.font or int,curState:bool,colors=((0,0,0),(200,100,100),(100,100,200))) -> bool:
        """Draw a switch object: On & Off"""
        tx = ""
        if curState:
            tx = "On"
            C = colors[2]
        else:
            tx = "Off"
            C = colors[1]
        if self.draw_button(Position,tx,font,colors[0],C):
            curState = not curState
            pyg.time.delay(150)
        return curState

    def hex_to_rgb(self,hex):
        """Convert Hexadecimal to RGB"""
        rgb = []
        for i in (0, 2, 4):
            decimal = int(hex[i:i+2], 16)
            rgb.append(decimal)
        
        return tuple(rgb)
    
    def rgb_to_hex(self,r, g, b) -> str:
        """Convert RGB to Hexadecimal"""
        return '#{:02x}{:02x}{:02x}'.format(r, g, b)

    def quit(self):
        """Pygame.quit() event with sys.exit()"""
        pyg.quit()
        exit()

    def save_surface(self,surface: pyg.surface):
        """Save a screenshot of the passed surface"""
        pyg.image.save(surface,f'{self.screenshot_path}{datetime.now().strftime(strftime)}.png')

    def key_pressed(self,Key:int) -> bool:
        """Return True while the key pressed"""
        keys = pyg.key.get_pressed()
        if keys[Key]:
            return True
        else:
            return False

    def events(self):
        """Get Pygame Events"""
        return pyg.event.get()

    def get_scale_ratio(self,map=[[]],tile_size=64) -> float:
        """Math to get a scale ratio based on tile map and tile_size"""
        SCREEN_SIZE = self.screen.get_size()
        if tile_size <= 0:
            tile_size = 1
        X_ROWS = len(map[0])
        Y_ROWS = len(map)
        X_RATIO = X_ROWS/SCREEN_SIZE[0]
        Y_RATIO = Y_ROWS/SCREEN_SIZE[1]
        TILES_FORX = SCREEN_SIZE[0]/tile_size
        TILES_FORY = SCREEN_SIZE[1]/tile_size
        ratio = ((TILES_FORX+TILES_FORY)/2)*((X_RATIO+Y_RATIO)/2)
        return ratio

    def update(self):
        """Update screen"""
        pyg.display.update()


# Test Engine
if __name__ == "__main__": #Test Engine
    pme = PyMaxEngine()
    pme.create_screen((125,125),flags=FULLSCREEN|SCALED)
    