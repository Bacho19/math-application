const { Router } = require('express')
const Tasks = require('../models/Tasks')

const router = Router()

router.post('/generate', async (req, res) => {
  try {
    const { title, titleNum, url } = req.body

    const candidateTitle = await Tasks.findOne({ title })
    const candidateUrl = await Tasks.findOne({ url })
    const candidateNum = await Tasks.findOne({ titleNum })

    if (candidateTitle) {
      return res
        .status(400)
        .json({ message: 'A topic with the same name already exists' })
    }

    if (candidateUrl) {
      return res
        .status(400)
        .json({ message: 'A topic with the same url already exists' })
    }

    if (candidateNum) {
      return res
        .status(400)
        .json({ message: 'A topic with the same number already exists' })
    }

    const task = new Tasks({
      title,
      titleNum,
      url,
    })

    await task.save()

    res.status(201).json('Тема создана')
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong, please try again' })
  }
})

router.post('/generate/task', async (req, res) => {
  try {
    const { selectedToc, taskTitle, taskContent, taskHint } = req.body

    await Tasks.findOneAndUpdate(
      {
        title: selectedToc,
      },
      {
        $push: {
          tasks: {
            name: taskTitle,
            task: taskContent,
            hint: taskHint,
          },
        },
      },
      {
        useFindAndModify: false,
      }
    )

    res.status(201).json('Task created')
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong, please try again' })
  }
})

router.get('/toc', async (req, res) => {
  try {
    const tasks = await Tasks.find()
    res.json(tasks)
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong, please try again' })
  }
})

router.get('/toc/:url', async (req, res) => {
  try {
    const tasks = await Tasks.findOne({ url: req.params.url })
    res.json(tasks)
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong, please try again' })
  }
})

module.exports = router
