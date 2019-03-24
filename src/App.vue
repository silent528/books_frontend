<script>
    export default {
        onLaunch: function() {
            console.log('App Launch');
            // #ifdef APP-PLUS
            // 锁定屏幕方向
            plus.screen.lockOrientation('portrait-primary'); //锁定
            // 检测升级
            uni.request({
                url: 'https://uniapp.dcloud.io/update', //检查更新的服务器地址
                data: {
                    appid: plus.runtime.appid,
                    version: plus.runtime.version,
                    imei: plus.device.imei
                },
                success: (res) => {
                    console.log('success', res);
                    if (res.statusCode == 200 && res.data.isUpdate) {
                        let openUrl = plus.os.name === 'iOS' ? res.data.iOS : res.data.Android;
                        // 提醒用户更新
                        uni.showModal({
                            title: '更新提示',
                            content: res.data.note ? res.data.note : '是否选择更新',
                            success: (showResult) => {
                                if (showResult.confirm) {
                                    plus.runtime.openURL(openUrl);
                                }
                            }
                        })
                    }
                }
            })
            // #endif
        },
        onShow: function() {
            let winWidth = uni.getSystemInfoSync().windowWidth
            console.log('App Show', winWidth)
        },
        onHide: function() {
            console.log('App Hide')
        }
    }
</script>

<style>
    /* uni.css - 通用组件、模板样式库，可以当作一套ui库应用 */
    @import './common/uni.css';

    /* 以下样式用于 hello uni-app 演示所需 */
    @font-face {
        font-family: 'iconfont';
        src: url(data:application/font-woff2;charset=utf-8;base64,d09GMgABAAAAAAkYAA0AAAAAEcQAAAjAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP0ZGVE0cGh4GVgCDChEICpV0kSELHgABNgIkAyQEIAWFCAeBAxtrDlGUblKT7MdBTnZqulNmKpXm9DlyLEi+zAdehewIN2s2CcGslmr6NaWmQE0NqFjOTOHMjXt3ePjvvt03M+dzHEUWhRv4JhpHZelK4cphRDsFNENuJrR+R+JATX16QWr6Inr8CKNdpHUgVpVRFZnqU5ap/7fW6s6pRPK9wTQUqliLf/YOdvYwHVznELOQKAFCE5METRIhWogQGxbVWapnBQX6HeEFAGh/eHRw4wAAPL0djTQElAUCIAsZywXECSFEaABUAK2ANQRbYDcBYB79PPpBQHAAMKwM1oHZs4R6UD7R52acMSHlmgA1AAjScDnNtoQmpyDBTmhmFiT4feQTGf2N8cZy4zTjTONm40Hjkc/Npkqd0PTXtDHqIXWO2kkx1BjVQBVS+VZbALHKUQMNepQiYwaAfw+aUa0SlCJkK4Tq8HUxsQQkAgIvIkRCIKodYQkopUVKIoRAQFtzOa9NCQgxYvsI5VIBl1s3zLItgQADJk0IhEdQk6gzwM6TI6XCXGjlxo9IZI9rGlGQTkOM2ZGGwRwCcpt6OBomyKpEqi5jgGrKzk8g0wUYUHIElD0NAckCEDm8ApCQgyQ4E6qrMw+Fx7yEVJgbsXIo2yNnUQ5GlIKUB71KjigoCyg5zxBIw2UMcqSEYUDRCTgNz1By3Kg5JDtuRDI3O4BZnQ5kCs0sXyX7mytE0Y4DWYJQQRyzs1BPyktQGitQ2+c59VZJuOsd8GTujbPMYfg77n5XEd/7K/16zxN8X3Rd3nFE9ly8hbs8O0tzl7sZHyGc4BQApGPJ0LqF5z5p2h2Hg2G9cTplxx2eyCFnm4Zo6wBeVwrpbpmRvDID08yTQEGZlMQOB/gQ6gkAHIfTKmWPdJKvU1wdclIPT0l6QN0WlQ+/Sd+Vr+iLcDZF4QKHZEYw53CaybyKMFKsaDCpH5u5OcNIM4kVyvy1pThD8xgEFc/2YgssM1tUwr4M15NxTqfFyhvT9QQYivOMv7xIMxlBA0Hj413aaatr5WxrbmYQN1dIsYWFub58eqJgTMQSw4cSUxM4k8kv6CPaczhtjj0LoQRzFp+MZ+f1FRLjeH2chmiE4pLjxQydm1/Ya5h4o7veFu8t5ziuy390oeKLvohTthl3lM5v4ZPn+Tv9f/wTd7lgmIkkzesQ0hiz7amNN+t6So5IKAsyn6oF5MVva6j7XyYR4HbLa5Bu3B5UNfXw25Seco7SC+PKz39pvXjiFfBI0lDJsBqFZvrpy78LBzyvnpKzhIHVpJTnbnXnXd0HyNlkrvf08ASomEinF888NcwTV8g6hVufqzco56UCDCk5lC3ZXU10yMqiHUS1pIIsIyt68O3/VBn131Ad2mAZ3OJmsTpaGS3KKsLwVSQre5ZQyqITFxOwPyYSM6hBFZGhaEW0JlKh3oBoqKHs73845AIROmC198nIk3t9NtIbKyxPRsSc9wZ6w/SMoi3Se+9g+qlrNT3dZTrtRwz1TxVKbCTC6r4QOnYRgvAhEISeH34WvBJkvNUd/mtBOv97PiH4MbBbliC5ul2SIV+B3cZW0Olvj1z5MVF53PyK+Yn+5yzWJJJPTiI6VAYWn7XLIhh+DaVBySfGS1KkUBbx+gB5erKjQZ8tQWIK5QFc+P1dso1KX1Pzt8pmvkP/BtVnF54v87XEbPzECdyjs3kCKX2dOX7fk+gHU+ooLseyCUnVKcfEwhf5MvM17KuYkHP5svjKFYjcCJZvfKKYmkoYvv5ajxtwIkT1uLSBKM1xPjRt+8DFeIf0Jfily/hifMmlS0v4zMuX5I+TEDDybga1wlG+xbCCUnAhdBTE5ebGL/iV36tVhySvKOL9CkCmXaJtfEtLvG2iXaacwbiyFfitm9gKbk9fQKlzYpJLaYNLCUDdoKHEOSnJuaTBuRSAPgFvqtGECViNDT7Eco1IPIJOYHJgCnINh/uYSGrbp/mNZHVyvUIhPqTIZUHMMw3DlQ9/e3tYPp+TtOYDlautT+aacVkfbS71YU0ye37lp29/Kx/mMppnMQtcigbFdnJ3lCTOxkqPwpSmhOo99IcP9J7wok0pMp30xUT3U1KdbLGuOuE5Zk/bY895qsvxMukp94kvpI1T7qx/gaKgF+8OESfmwFCUVXy2Os+woCHNt3OmQu2+xnJL3uw4xYxxd3WtPj8mOyRZVuT9aHG5jzjl2woN5TZUsDJRJ5/9xeTl9PDhAn10vrTD88Lg9KWHNsTkkMh//t/rw9dHbYWquUgqqnZTbMV5tzPb/+SwXskp6FYxBRzl+gq3knQdsUykEuYqmXVvzjakvOWAgYDOVr4ROdoABvUFkykNbdgwhNlAwD0BcvoT45zLnMcWmzXYXH6PCwTelj275mlxso3/twdVjY5WgSJGwJWPjFYQXIEO5jzeg5j4rjrDDYSY75mzzNnxKpqYPbE2WNiB4P+aKBSzB0UxKmDVQjXE5mls5RZ3pTZSCInqU8Kd008BKxXJ397T1aMqcdRvHEjAw9i9nevp/BJPAAAObITroaerJ7RM/IDOTJRUwr2eszEKKhPEiqZUgzF5hEPkCpFfDAAPL8NEWOY15DDnDbUiHPkpxrB1YBzHNESoN2IWvguYxPEO83iFmueTx1LARX3hlnoCYERCjTEiFRgnoUWEej5msbALkyTuYJ5CXx/O5xqdwBOnV4MaGt9vPVqtwYgt6nTp1LiGBg/w3mkXn/GI/8iyMPRKh/rTAXI1aKLVrkYv+D3VqXafuhKxUINefVqG0xR8+YNXYlev8PUfipJSOodPeJyefXSaBNTYNRpZo14md8RpiVOwBu02pMW07nq5tbReHQ1f8DZ+xz5dU4BG0/jarfiNFfEllOTf9i8GaJ6/sVsEP3uhxpmLfdWtmQYvraU1Dhafm455+rIUnoBEj0ewwBCOCMRCJGIjDuIiHuIjAdnXrG1tqcEDSLp0afu0XeRTzzqsY5DzVLOY3dvwHDqVfI6cxn5i2YTX1NcTT2wBAAAA) format('woff2'),
        url(data:application/font-woff;charset=utf-8;base64,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) format('woff');
        font-weight: normal;
        font-style: normal;
    }

    .iconfont {
        font-family: "iconfont" !important;
        font-size: 16px;
        font-style: normal;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    .icon-search:before {
        content: "\e65c";
    }

    .icon-settings:before {
        content: "\e68a";
    }

    .icon-refresh:before {
        content: "\e6a4";
    }

    .icon-delete:before {
        content: "\e6b4";
    }

    .icon-profile:before {
        content: "\e6b7";
    }

    .icon-add:before {
        content: "\e767";
    }

    .icon-move:before {
        content: "\e768";
    }

    .icon-my:before {
        content: "\e687";
    }

    .icon-shu:before {
        content: "\e630";
    }

    .icon-shujia:before {
        content: "\e601";
    }

    .icon-sousuo:before {
        content: "\e644";
    }

    .boder-buttom{
        border-bottom: 1px solid #e5e5e5;
    }

    .page,body {
        background-color: #f8f8f8
    }

    .title{
        color: #777;
        padding: 20upx 36upx;
        background-color: #ffffff;
    }
</style>
