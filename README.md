## Slot Game Challenge

**Task description**

You need to create a small Slot game using [PhaserJs](https://photonstorm.github.io/phaser3-docs/) framework.

**Game description**

This Slot game will have 3 reels(columns) and 3 possible symbols in each reel. Game is won if the symbols match in all three reels after the spin.

**note**: 3 possible symbols does not mean that only the same column of just 3 symbols are in each reel like this: `["cherry", "banana", "blackberry"]`.
In each reel there should be these 3 symbols repeated in different configurations: `["banana", "banana", "cherry", "blackberry", "cherry", "banana"]`, so after the random time of spinning for each reel, when these differently configured reels stop, many different outcome combinations can be possible, just like in a real slot game.

[Example slot game](https://evoplay.games/game/fruit-super-nova/)

**Game Functionality**

- After clicking the **Spin** button, the **Spin** button should deactivate(change it's tint to gray and become unclickable) and the reels should start spinning.
- After each of them spinning for a random time (1-3 seconds), the reels should stop one by one(first one should stop first, then the second one...)

**note**: each of the reels should spin for a random time, but the first one should stop first and the second one, second... so if the first one stops after 1.3 seconds, second one cant stop earlier than 1.3 seconds

- If the symbols match in all three reels, we should notify the player that he won the game("Big Win" image popup).
- Popup disappears and The **Spin** button becomes active again

**How the Game should look like**

[During the start of the game](https://ibb.co/ZMhRSsk)

[During a spin](https://ibb.co/FhXS7xj)

[During a win](https://ibb.co/x1HM71t)

**Bonus**  
As a bonus functionality, You could add what's called a "Cheat Tool" to the game. Cheat tool should allow inserting numbers for each reel, after which the spinning should not stop at a random symbol in the array of the reel, but on the index specified in the input(although the spinning should last not less than 2 seconds even in this case, so the reel should find the place to stop after it has already span for 2 seconds)

[Cheat tool off](https://ibb.co/0fHJxBP)

[Cheat tool on](https://ibb.co/ky98pjZ)

**Necessary resources**

[PhaserJs official documentation](https://photonstorm.github.io/phaser3-docs/)

[PhaserJs Introduction video](https://www.youtube.com/watch?v=hI_LS8bdkM4&ab_channel=Zenva)

[PhaserJs Another tutorial](https://www.youtube.com/watch?v=3Q5jP85PXrE&ab_channel=Ourcade)

**More notes**

Most of the functionality can be achieved using [Sprites](https://photonstorm.github.io/phaser3-docs/Phaser.GameObjects.Sprite.html), [Containers](https://photonstorm.github.io/phaser3-docs/Phaser.GameObjects.Container.html) and [Tweens](https://photonstorm.github.io/phaser3-docs/Phaser.Tweens.Tween.html). Although, you are free to use any method you like.

All the resources necessary for the game are in the **public** folder

**Instructions**

1.  Create a new Repository on your account
2.  Clone this Repository
3.  Finish the task
4.  Set your new Repository as the origin: `git remote set-url origin ${your repo url}`
5.  Push your local solution to your remote Repository.
