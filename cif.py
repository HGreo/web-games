from image_audio import *
import pygame
from random import *
W,H = 288,512
FPS = 30#每秒循环更新30张图片

class Bird():
    def __init__(self,x,y):
        """运行小鸟必须执行的代码 或者小鸟刚出生时要做的事情"""
        #加载小鸟的图片,t图片的x,y坐标,y方向的速度, 小鸟拍动翅膀1速度,小鸟造型切换
        self.images=images['bird']#将字典中birds这个键的值保存在self.images
        self.frame=[0]*5+[1]*5+[2]*5+[1]*5
        self.idx=0
        self.image=self.images[self.frame[self.idx]]#具体帧造型
        self.rect=self.image.get_rect()
        self.rect.x=x
        self.rect.y=y
        self.y_vel=-10#向上的速度
        self.max_y_vel=10#向下的速度
        self.gravity=1
        self.ANGLE_UP = 45#向上飞翔的角度
        self.ANGLE_DOWN = -20#向下飞行的角度
        self.ANGLE_CHANGE = -3#角度变化的值
        self.y_vel_after_flap = -10#重新按下空格键时拍动翅膀的初始速度
        self.rotate_after_flap = 45#重新按下空格键时拍动翅膀的初始角度


    def update(self,flap=False):
        if flap:#当玩家按下空格时,将角色的向上速度与角度立刻更改
            self.y_vel = self.y_vel_after_flap
            self.ANGLE_UP = self.rotate_after_flap
        self.idx=(self.idx+1)%len(self.frame)
        self.image=self.images[self.frame[self.idx]]#具体帧的图片将从0-20之间切换
        self.y_vel=min(self.y_vel+self.gravity,self.max_y_vel)#在角色不断向上的过程中 速度会慢慢减小 直到抵达最大坠落速度10
        self.rect.y+=self.y_vel#更新角色的位置
        self.ANGLE_UP = max(self.ANGLE_UP+self.ANGLE_CHANGE,self.ANGLE_DOWN)
        self.image = pygame.transform.rotate(self.image,self.ANGLE_UP)#同上

    def u(self):
        self.idx = (self.idx + 1) % len(self.frame)
        self.image = self.images[self.frame[self.idx]]#同切换具体帧

    def death(self):
        self.rect.y+=self.max_y_vel
        self.rect.y = min(self.max_y_vel+self.rect.y,370)
        self.ANGLE_UP = -20
        self.image = self.images[self.frame[self.idx]]
        self.image =  pygame.transform.rotate(self.image,self.ANGLE_UP)

class Pipe(pygame.sprite.Sprite):
    def __init__(self,x,y,upwards=True):
        pygame.sprite.Sprite.__init__(self)
        if upwards:
            self.image = images['pipe']
            self.rect = self.image.get_rect()
            self.rect.x = x
            self.rect.top = y
        else:
            self.image = images['pipe']
            self.image = pygame.transform.flip(self.image,False,True)
            self.rect = self.image.get_rect()
            self.rect.x = x
            self.rect.bottom = y
        self.x_vel = -4
    """
    1.确定管道的造型
    2.确定管道初始的x,y
    3.确定移动的速度
    """
    def update(self):
        self.rect.x+=self.x_vel
        if self.rect.x<-60:
            self.rect.x = W
