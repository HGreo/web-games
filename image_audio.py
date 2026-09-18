import os
import pygame

images={}#创建字典
for image in os.listdir('sprites'):
    #listdir列出文件夹中所有的文件包括文字和后缀
    name=image.removesuffix(".png")
    path = os.path.join('sprites',image)#将图片名称与文件夹前缀组合在一起(斜杠自动补齐)
    images[name]=pygame.image.load(path)#将图片储存在字典里对应的键

#加载声音
Audio = {}#同上
pygame.mixer.init()#初始化声音
for audio in os.listdir('audio'):
    name=audio.removesuffix(".wav")
    path = os.path.join('audio',audio)
    Audio[name]=pygame.mixer.Sound(path)#同上

