"""
主程序:
1.背景：程序开始时随机选择白天或黑夜
2.草坪：游戏开始和进行时都是从右往左不断移动的过程
3.柱子：程序开始时随机选择蓝色或紫色柱子
4.小鸟：程序开始时随机选择小鸟颜色，翅膀的下中上的造型不断循环
5.分数
6.声音
按下空格键切换三个界面:游戏初始化界面；游戏中界面；游戏结束界面
"""
import pygame
from image_audio import *
from random import *
from cif import *

pygame.init()
screen = pygame.display.set_mode((W,H))
pygame.display.set_caption("Flying Bird")
clock = pygame.time.Clock()
Floor_Y = H - images['floor'].get_height()#地板的位于左上角坐标由整体屏幕的高度减去地板的高度而得出
pipe_Y = Floor_Y - images['green-pipe'].get_height()#同上

def main():
    while True:
        Audio['start'].play()
        images['bg'] = images[choice(['day', 'night'])]
        images['pipe']=images[choice(['green-pipe','red-pipe'])]
        color=choice(['red','yellow','blue'])#随机选择背脊和角色&管道颜色
        images['bird']=[images[color+"-up"],images[color+"-mid"],images[color+"-down"]]#将随机颜色的角色的三种动作纳入一个列表并储存在键里面
        menu_window()#游戏前界面
        result = game_window()#游戏中界面
        end_window(result)#游戏结束界面
def menu_window():
    bird = Bird(30, 235)#将角色元素赋予bird这个变量
    bird_range=[215,240]#角色上下飞的极限
    bird_y=1
    floor_x = 0
    floor_gap=images['floor'].get_width()-W#地板比屏幕宽多出来的一部分
    guide_W = (W - images['guide'].get_width())/2
    guide_H = (Floor_Y - images['guide'].get_height())/2#引导的坐标位于屏幕正中央
    while 1:
        #游戏开始界面小鸟拍动翅膀并上下飞翔
        screen.blit(images['bg'], (0, 0))#背景
        screen.blit(images["floor"],(floor_x,Floor_Y))#地板
        screen.blit(images["guide"],(guide_W,guide_H))#引导
        bird.u()#切换具体帧
        bird.rect.y+=bird_y#角色上移1
        if bird.rect.y<bird_range[0] or bird.rect.y>bird_range[1]:
            bird_y*=-1
        screen.blit(bird.image,bird.rect)
        floor_x-=3#地板不断移动
        if floor_x <-floor_gap:
            floor_x=0
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                exit()
            if event.type == pygame.KEYDOWN:
                if event.key == pygame.K_SPACE:
                    Audio["flap"].play()
                    return

        pygame.display.update()
        clock.tick(FPS)

def game_window():
    #游戏背景,草坪,小鸟,柱子
    #定义全局变量得分
    score = 0
    floor_x = 0
    floor_gap = images['floor'].get_width() - W
    bird=Bird(35, 235)
    distance =170
    gap = 100
    n = 4 #四根水管
    pipe_group = pygame.sprite.Group()
    for i in range(n):
        pipe_y = randint(int(H*0.3),int(H*0.7))
        pipe_up = Pipe(W+i*distance,pipe_y,True)
        pipe_down = Pipe(W+i*distance,pipe_y-gap,False)
        pipe_group.add(pipe_up)
        pipe_group.add(pipe_down)

    while True:
        first_pipe_up = pipe_group.sprites()[0]
        first_pipe_down = pipe_group.sprites()[1]

        if first_pipe_up.rect.right<0:
            score+=1
            Audio['score'].play()
            pipe_y=randint(int(H*0.3),int(H*0.7))
            new_pipe_up = Pipe(first_pipe_up.rect.x+n*distance,pipe_y,True)
            new_pipe_down = Pipe(first_pipe_down.rect.x + n * distance, pipe_y-gap, False)
            pipe_group.add(new_pipe_up)
            pipe_group.add(new_pipe_down)
            first_pipe_up.kill()
            first_pipe_down.kill()

        pipe_group.update()
        screen.blit(images["bg"], (0, 0))
        pipe_group.draw(screen)
        screen.blit(images["floor"], (floor_x, Floor_Y))
        screen.blit(bird.image,bird.rect)

        floor_x -= 3
        if floor_x < -floor_gap:
            floor_x = 0
        flap=False
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                exit()
            if event.type == pygame.KEYDOWN and event.key == pygame.K_SPACE:
                Audio["flap"].play()
                flap = True
        if bird.rect.y>Floor_Y or bird.rect.y<=0:
            Audio['hit'].play()
            Audio['die'].play()
            result={'bird':bird,'score':score,'pipe_group':pipe_group}
            return result
        for pipe in pipe_group.sprites():
            if pygame.sprite.collide_mask(bird,pipe):
                Audio['hit'].play()
                Audio['die'].play()
                result = {'bird': bird, 'score': score, 'pipe_group': pipe_group}
                return result

        score_str = str(score)
        w=images['0'].get_width()*1.2
        x,y=10,10
        for number in score_str:
            screen.blit(images[number],(x,y))
            x+=w

        bird.update(flap)
        pygame.display.update()
        clock.tick(FPS)

def end_window(result):
    bird= result['bird']
    score_str = str(result['score'])
    pipe_group = result['pipe_group']
    while True:
        screen.blit(images["bg"], (0, 0))
        pipe_group.draw(screen)
        screen.blit(images["floor"], (0, Floor_Y))
        screen.blit(bird.image,bird.rect)
        screen.blit(images['gameover'],((W-images['gameover'].get_width())/2,(Floor_Y-images['gameover'].get_height())/2))
        w = images['0'].get_width() * 1.2
        x, y = 10, 10
        for number in score_str:
            screen.blit(images[number], (x, y))
            x += w
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                exit()
            if event.type == pygame.KEYDOWN and event.key == pygame.K_SPACE:
                return
        bird.death()
        pygame.display.update()
        clock.tick(FPS)

main()